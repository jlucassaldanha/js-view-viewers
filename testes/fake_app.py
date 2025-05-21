from flask import Flask, render_template, make_response, jsonify, request
from mytwitchapi import Basics, OAuth
import json


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

        r = api.Get_Users(logins=logins)

    elif request.args.get('login') == None:
        ids = request.args.getlist('id')

        r = api.Get_Users(ids=ids)
    
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

@app.route("/api/get_viewers_on", methods=["GET"])
def get_viewers_on():
    """client_id = request.args.get('client_id')
    token = request.args.get('token')
    scopes = request.args.get('scopes')
    
    api = Basics(client_id, token, scopes)

    broadcaster_id = request.args.get('broadcaster_id')
    moderator_id = request.args.get('moderator_id')

    chatters = api.Get_Chatters(broadcaster_id, moderator_id)

    all_viewers_ids = [chatter['user_id'] for chatter in chatters]
    viewers_users = [chatter['user_name'] for chatter in chatters]

    mods = api.Get_Moderators(broadcaster_id, all_viewers_ids)
    
    mods_users = [mod['user_name'] for mod in mods]
    viewers_users = list(set(viewers_users) - set(mods_users))

    viewers_count = str(len(all_viewers_ids))

    users_mods = api.Get_Users(mods_users)
    mods_info = [{"username" : user_mod['display_name'], 
                "id" : user_mod['id'] , 
                "profile_img_url" : user_mod['profile_image_url']} for user_mod in users_mods]

    users_viewers = api.Get_Users(viewers_users)
    viewers_info = [{"username" : user_viewer['display_name'], 
                    "id" : user_viewer['id'],
                    "profile_img_url" : user_viewer['profile_image_url']} for user_viewer in users_viewers]"""
    
    with open("db.json", "r", encoding="UTF-8") as db:
        dt = json.load(db)
    db.close()

    ids = []
    for id in dt["mods_info"]:
        ids.append(id)

    for id in dt["viewers_info"]:
        ids.append(id)

    data = {
        "ids_only" : ids,
        "mods": dt['mods_info'],
        "viewers" : dt['viewers_info'],
        "count" : (len(dt['mods_info']) + len(dt['viewers_info'])),
    }
    
    return make_response(jsonify(data))

# A ideia é ao mostrar usuarios no site, ele deve salvar os dados em um arquivo json com os usuarios que foram mostrados, para que então toda vez que seja pego novos dados poder comparar se houve alguma mudança de usuarios

@app.route("/api/saved_viewers", methods=['POST', "GET"])
def saved_viewers():
    if request.method == "POST":
        data = request.json

        with open("viewers.json", "w", encoding="UTF-8") as json_file:
            json.dump(data, json_file, indent=4, ensure_ascii=False)
        json_file.close()

        return make_response(jsonify(data))

    elif request.method == "GET":
        with open("viewers.json", "r", encoding="UTF-8") as json_file:
            data = json.load(json_file)
        json_file.close()

        return make_response(jsonify(data))

@app.route("/views")
def views():
    return render_template("index.html") 

if __name__ == "__main__":
    app.run()
    #from waitress import serve
    #serve(app, host="localhost", port=5000)

    #https://www.kaspersky.com.br/resource-center/definitions/cookies
    #https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
