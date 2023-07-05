from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/python")
def hello_world():
    return {"message": 'Hello World'}

if __name__ == "__main__":
    app.run(debug=True, port = 8080)