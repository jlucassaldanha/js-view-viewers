from mytwitchapi.creds_flow import OAuth
from mytwitchapi.twich_api_client import Basics


oauth = OAuth()

oauth.credentials("credentials.json")
client_id = oauth.client_id

oauth.access_token("token.json")
token = oauth.token
scopes = oauth.scopes

api = Basics(client_id, token, scopes)

user_info = api.Get_Users(['ASegundaFeira'])

print(user_info)