# from http.server import BaseHTTPRequestHandler
 
# class handler(BaseHTTPRequestHandler):
 
#     def do_GET(self):
#         self.send_response(200)
#         self.send_header('Content-type','text/plain')
#         self.end_headers()
#         self.wfile.write('Hello, world!'.encode('utf-8'))
#         return
from flask import Flask
from flask_cors import CORS
from readFile import *

app = Flask(__name__)
CORS(app)

with open("episode_metadata.json", "r") as f:
    episode_metadata = json.load(f)

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