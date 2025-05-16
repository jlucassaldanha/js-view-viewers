import requests

#url = "http://127.0.0.1:5000/api/get_users?client_id=aaaaa&token=bbbbbbbb&scopes=ccccccccc&login=1&login=2&login=3"

url = "http://127.0.0.1:5000/api/credentials"

r = requests.get(url)
print(r.status_code)
print(r.json())

input("Aperte enter para sair")