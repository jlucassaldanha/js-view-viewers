from flask import Flask, render_template, make_response, jsonify
from mytwitchapi import Basics, OAuth

app = Flask(__name__)

@app.route("/")
def home():
    return "API HOME"

@app.route("/api/credentials", methods=["GET"])
def get_secrets():
    auth = OAuth()

    auth.credentials("credentials.json")
    auth.access_token("token.json")

    data = {
        "token" : auth.token,
        "client_id" : auth.client_id,
        "scopes" : auth.scopes
    }

    return make_response(jsonify(data))

@app.route("/api/get_users/<data>", methods=["GET"])
def get_users():
    
    
    api = Basics(auth.client_id, auth.token, auth.scopes)

    api.Get_Users()
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

