from mytwitchapi.creds_flow import OAuth

def oauth():
    auth = OAuth()

    auth.credentials("credentials.json")
    auth.access_token("token.json")

def get_viewers():
    global viewers_count, viewers_txt, mods_txt
    ojoojao_id = "459116718"
    
    api = Basics(client_id, token, scopes)

    
    chatters = api.Get_Chatters(ojoojao_id, ojoojao_id)

    viewers_ids = [chatter['user_id'] for chatter in chatters]
    viewers_users = [chatter['user_name'] for chatter in chatters]

    mods = api.Get_Moderators(ojoojao_id, viewers_ids)
    mods_users = [mod['user_name'] for mod in mods]
    viewers_users = list(set(viewers_users) - set(mods_users))

    viewers = [c for c in chatters if c["user_name"] != "ojoojao" and c["user_name"] != "Nightbot" and c["user_name"] != "StreamElements"]

    mods_txt = ""
    for m in mods_users:
        if m != 'Nightbot' and m != 'StreamElements':
            mods_txt += m + "\n"

    viewers_txt = ""
    for v in viewers_users:
        if v != 'ojoojao':
            viewers_txt += v + "\n"

    viewers_count = str(len(viewers))

    return mods_txt, viewers_txt, viewers_count  

if __name__ == "__main__":
    oauth()