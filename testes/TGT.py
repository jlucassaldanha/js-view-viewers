import requests, json

url = "http://localhost:5000/api/saved_viewers"

dt = {
    "mods": [{
        "nome": "1"
    }],
    "viewers": [{
        "nome": "2"
    }]
}

#r = requests.post(url, json=dt)
#print(r.status_code)

#r = requests.get(url)
#print(r.status_code)
#print(r.json())

#input("Aperte enter para sair")


with open("teste.json", "w", encoding="utf-8") as file:
    json.dump({"nome":"João"}, file, indent=4, ensure_ascii=False)