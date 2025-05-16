from flask import Flask, render_template, make_response, jsonify, request
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

@app.route("/api/get_users", methods=["GET"])
def get_users():
    ids, logins = None, None

    client_id = request.args.get('client_id')
    token = request.args.get('token')
    scopes = request.args.get('scopes')
    
    api = Basics(client_id, token, scopes)

    if request.args.get('id') == None:
        logins = request.args.getlist('login')

        r = api.Get_Users(logins)

    elif request.args.get('login') == None:
        ids = request.args.getlist('id')

        r = api.Get_Users(ids)
    
    data = {
        "data": r
    }

    return make_response(jsonify(data))

@app.route("/api/get_chatters", methods=["GET"])
def get_chatters():
    client_id = request.args.get('client_id')
    token = request.args.get('token')
    scopes = request.args.get('scopes')
    
    api = Basics(client_id, token, scopes)

    broadcaster_id = request.args.get('broadcaster_id')
    moderator_id = request.args.get('moderator_id')

    r = api.Get_Chatters(broadcaster_id, moderator_id)
    
    data = {
        "data": r
    }
    
    return make_response(jsonify(data))

@app.route("/api/get_mods", methods=["GET"])
def get_mods():
    client_id = request.args.get('client_id')
    token = request.args.get('token')
    scopes = request.args.get('scopes')
    
    api = Basics(client_id, token, scopes)

    broadcaster_id = request.args.get('broadcaster_id')
    mods_ids = request.args.getlist('viewer_id')

    r = api.Get_Moderators(broadcaster_id, mods_ids)
    
    data = {
        "data": r
    }
    
    return make_response(jsonify(data))

@app.route("/get_viewers_on", methods=["GET"])
def get_viewers_on():
    client_id = request.args.get('client_id')
    token = request.args.get('token')
    scopes = request.args.get('scopes')
    
    api = Basics(client_id, token, scopes)

    broadcaster_id = request.args.get('broadcaster_id')
    moderator_id = request.args.get('moderator_id')

    chatters = api.Get_Chatters(broadcaster_id, moderator_id)

    viewers_ids = [chatter['user_id'] for chatter in chatters]
    viewers_users = [chatter['user_name'] for chatter in chatters]

    mods = api.Get_Moderators(broadcaster_id, viewers_ids)
    mods_users = [mod['user_name'] for mod in mods]
    viewers_users = list(set(viewers_users) - set(mods_users))

    viewers = [c for c in chatters if c["user_name"] != "ojoojao" and c["user_name"] != "Nightbot" and c["user_name"] != "StreamElements"]

    viewers_count = str(len(viewers))

    data = {
        "mods": mods_users,
        "viewers" : viewers_users,
        "count" : viewers_count 
    }
    
    return make_response(jsonify(data))

@app.route("/views")
def views():
    return render_template("index.html")

if __name__ == "__main__":
    app.run()

