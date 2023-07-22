from sanic import Sanic
from sanic.response import json
app = Sanic()
 
 
@app.route('/')
@app.route('/<path:path>')
async def index(request, path=""):
    return json({'hello': path})


# from flask import Flask
# from flask_cors import CORS
# from readFile import *

# app = Flask(__name__)
# CORS(app)

# with open("episode_metadata.json", "r") as f:
#     episode_metadata = json.load(f)

# @app.route("/api/episode_data/<episodeName>")
# def episode_data(episodeName):
#     episode = get_episode(episodeName)
#     return episode

# @app.route("/api/episode_name")
# def episode_name():
#     with open("name_list.json", "r", encoding="utf-8") as f:
#         names = json.load(f)
#     return names

# if __name__ == "__main__":
#     app.run(debug=True, port = 8080)