from mytwitchapi.creds_flow import OAuth

def oauth():
    auth = OAuth()

    auth.credentials("credentials.json")
    auth.access_token("token.json")

if __name__ == "__main__":
    oauth()
    