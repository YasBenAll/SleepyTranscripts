import os 
import json
# names = os.listdir("sleepycast")
# print(names)

stamper = "Stamper"
zach = "Zach"
jeff = "Jeff"
cory = "Cory"
mick = "Mick"
niall = "Niall"
chris = "Chris"

with open("data/sleepycast_members.json", "r") as file:
    sleepycast_members = json.load(file)

with open("data/sleepycast_sparse_episode_matrix.json", "r") as file:
    sleepycast_sparse_episode_matrix = json.load(file)

c = 0
sc_dict = {}
for i in sleepycast_sparse_episode_matrix.keys():
    sc_dict[c] = sleepycast_sparse_episode_matrix[i]
    sc_dict[c]['name'] = i
    # sleepycast_sparse_episode_matrix[i]['id'] = c
    c+=1

with open("data/id_member_episode.json", "w") as file:
    json.dump(sc_dict, file)
podcast_list = []

sleepycast_sparse_episode_matrix["S1:Pilot"]
ep_dict = {"SPEAKER_00":"Stamper", "SPEAKER_01":"Jeff", "SPEAKER_02":"Zach"}

with open(f"sleepycast/SleepyCast (Pilot) - [Just Spittin' the Shit].txt", encoding="utf8") as file:
    l = []
    for i, line in enumerate(file.readlines()):
        if line != "\n" and i%3: 
            speaker = line[1:11]
            timepart = line[11:]
            # print(timepart)
            line = ep_dict[speaker]+ timepart

        l.append(line)
with open(f"sleepycast2/SleepyCast (Pilot) - [Just spittin' the Shit].txt", "w",encoding="utf8") as file:
    for i in "".join(l):
        file.write(i)
    # text = [line for line in file.readlines() if line!="\n"]
    # speakers = [i.replace("\n", "")[1:-2] for i in text[::2]]
    # print(speakers)