import requests

r = requests.get("http://127.0.0.1:5000/api/get_user")
print(r.status_code, r.json())

input("Aperte enter para sair")