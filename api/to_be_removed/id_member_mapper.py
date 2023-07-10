import json
with open("data/id_member_episode.json", "r", encoding="utf8") as file:
    d = json.load(file)

with open("data/sleepycast_members.json", "r",encoding="utf8") as file:
    member_dict = json.load(file)

dd = {}
for i in d.keys():
    dd[i]={}
    for j in d[i]:
        if d[i][j]:
            dd[i][j]=d[i][j]
print(dd)

ddd = {}
for i in dd:
    members = []
    for j in dd[i]:
        if j != 'name':
            members.append(member_dict[j])
        else:
            print(dd[i][j])
    ddd[i]= members
        
print(ddd)

with open("name_list.json", "r",encoding="utf8") as file:
    name_list = json.load(file)
# print(name_list)

name_list2 = []
for i in name_list:
    l = i
    l["members"]=ddd[str(i["id"])]
    name_list2.append(l)
# print(name_list)
# with open("name_list.json", "w",encoding="utf8") as file:
#     json.dump(name_list, file, ensure_ascii=False)