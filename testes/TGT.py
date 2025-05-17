import requests

url = "http://127.0.0.1:5000/api/get_users?client_id=aaaaa&token=bbbbbbbb&scopes=ccccccccc&login=1&login=2&login=3"

url = "http://127.0.0.1:5000/api/get_users?client_id=9ugwa6mn6i6fek83xkqj676sfvbipd&token=boi332vg6bcqfzbih8z3gr6k2sqaz7&scopes=channel:read:vips,clips:edit,moderation:read,moderator:read:chatters,user:read:email,user:read:follows,user:write:chat&id=459116718&id=100135110&id=19264788"

r = requests.get(url)
print(r.status_code)
print(r.json())

input("Aperte enter para sair")