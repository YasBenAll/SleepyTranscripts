from flask import Flask
from api.readFile import *
import os

app = Flask(__name__)

@app.route("/api/python")
def hello_world():
    return "<p>Zeg maar Willy.</p>"

@app.route("/api/episode_data/<episodeName>")
def episode_data(episodeName):
    episode = get_episode(episodeName)
    return episode

@app.route("/api/episode_name")
def episode_name():
    x = os.path.join('api',"name_list.json")
    with open(x, "r", encoding="utf-8") as f:
        names = json.load(f)
    return names