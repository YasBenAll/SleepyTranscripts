from flask import Flask
from flask_cors import CORS
from readFile import *
from episodeNames import *

with open("sleepycast/SleepyCast (Pilot) - [Just Spittin' the Shit].txt", encoding="utf8") as file:
    text = file.readlines()

app = Flask(__name__)
CORS(app)



@app.route("/api/episode_data/<episodeName>")
def episode_data(episodeName):
    print(slugConverter["sleepycast-04-the-ghosts-of-grandmas-genitals"])
    # print(episodeName)
    episode = get_episode(slugConverter[episodeName])
    return episode

@app.route("/api/episode_name")
def episode_name():
    names = get_names()
    return names

if __name__ == "__main__":
    app.run(debug=True, port = 8080)