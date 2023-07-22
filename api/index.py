from flask import Flask
# from readFile import *

app = Flask(__name__)

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

# @app.route("/api/episode_data/<episodeName>")
# def episode_data(episodeName):
#     episode = get_episode(episodeName)
#     return episode

# @app.route("/api/episode_name")
# def episode_name():
#     with open("name_list.json", "r", encoding="utf-8") as f:
#         names = json.load(f)
#     return names