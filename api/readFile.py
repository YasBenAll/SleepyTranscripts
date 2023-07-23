import json
import os
import re

def speaker_process(lines):
    pattern1 = r"^(\w+)\s+"
    pattern2 = r"\[(\d+:\d+:\d+\.\d+)\s+-->\s+(\d+:\d+:\d+\.\d+)\]"

    line_list = []
    for line in lines:
        match = re.match(pattern1, line)
        if match:
            speaker = match.group(1)
        else:
            speaker = "???"

        match = re.findall(pattern2, line)
        if match:
            start_time = match[0][0]
            end_time = match[0][1]
        else:
            match = re.findall(r"\[(\d+:\d+)\s+-->\s+(\d+:\d+:\d+\.\d+)\]", line)
            if not match:
                match = re.findall(r"\[(\d+:\d+:\d+\.\d+)\s+-->\s+(\d+:\d+)\]", line)
            if not match:
                match = re.findall(r"\[(\d+:\d+)\s+-->\s+(\d+:\d+)\]", line)
            start_time = match[0][0]
            end_time = match[0][1]
        line_list.append((speaker, start_time, end_time))

    return line_list

def get_metadata():
    x = os.path.join('api',"episode_metadata.json")
    with open(x, "r", encoding="utf8") as f:
        episode_metadata = json.load(f)
    return episode_metadata


def get_episode(episode_name):
    episode_metadata = get_metadata()
    episode = episode_metadata[episode_name]["name"]

    episode_members = []
    with open(f"name_list.json") as file:
        name_list = json.load(file)

    for i in name_list:
        if i["slug"] == episode_name:
            episode_members = i["members"]
            break

    # print(episode_members)
    x = os.path.join('api',"sleepycast", episode)
    with open(x, encoding="utf8") as file:
        text = [line for line in file.readlines() if line!="\n"]
        speakers = speaker_process([i.replace("\n", "")[1:-2] for i in text[::2]])
        dialog = [i[:-1] for i in text[1::2]]
        data = {}
        data["dialog"]=[{"speaker":i[0][0], "dialog":i[1][2:], "start_time":i[0][1], "end_time":i[0][2]} for i in zip(speakers, dialog)]
        data["episode_name"]=episode[:-4] 
        data["youtube_link"]=episode_metadata[episode_name]["youtube"]
        data["members"]=episode_members
        return json.dumps(data)
