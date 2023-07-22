from flask import Flask
from flask_cors import CORS
from readFile import *

app = Flask(__name__)
CORS(app)

@app.route("/api/hello")
def hello():
    return "Hello World!"

@app.route("/api/episode_data/<episodeName>")
def episode_data(episodeName):
    episode = get_episode(episodeName)
    return episode

@app.route("/api/episode_name")
def episode_name():
    with open("name_list.json", "r", encoding="utf-8") as f:
        names = json.load(f)
    return names

if __name__ == "__main__":
    app.run(debug=True, port = 8080)