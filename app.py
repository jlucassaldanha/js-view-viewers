from flask import Flask, render_template, make_response, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return "API HOME"

@app.route("/api/credentials", methods=["GET"])
def credentials():
    data = {
        "data": "Sem dados"
    }
    return make_response(jsonify(data))

@app.route("/api/get_users", methods=["GET"])
def get_users():
    data = {
        "data": "Sem dados"
    }
    return make_response(jsonify(data))

@app.route("/api/get_chatters", methods=["GET"])
def get_chetters():
    data = {
        "data": "Sem dados"
    }
    return make_response(jsonify(data))

@app.route("/api/get_mods", methods=["GET"])
def get_mods():
    data = {
        "data": "Sem dados"
    }
    return make_response(jsonify(data))

@app.route("/views")
def views():
    return render_template("index.html")

if __name__ == "__main__":
    app.run()

