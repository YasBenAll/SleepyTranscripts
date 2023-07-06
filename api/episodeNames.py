import json
import os
from slugify import slugify

names = os.listdir("sleepycast")
names = [{"slug":slugify(i)[:-4], "name": i} for i in names]
slugConverter = {}
for i in names:
    slugConverter[i["slug"]]= i["name"]

def get_names():
    names = os.listdir("sleepycast")
    names = [{"slug":slugify(i)[:-4], "name": i[:-4]} for i in names]
    return json.dumps(names, ensure_ascii=False)

if __name__ == "__main__":
    names = get_names()
    print(names)
