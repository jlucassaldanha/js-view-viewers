/*
https://pythonve.ikitai.net/entry/2024/10/04/040000
https://medium.com/@fauzik354313/building-website-using-flask-html-javascript-and-python-study-case-791e336265f2
https://medium.com/@wiliansilva/comunica%C3%A7%C3%A3o-com-python-utilizando-node-js-bafaf6cd1b59
*/

/*
var mods = document.getElementById("modsUsers")
var viewers = document.getElementById("viewersUsers")

for (let p = 6; p < 9; p++) {
    let div = document.createElement("div")
    if (p == 6) {
        div.id = `user1`
    } else {
        div.id = `user`
    }
    
    
    mods.appendChild(div)

    let img = document.createElement("img")
    img.src = `pessoa${p}.jpg`
    img.alt = `pessoa${p}`

    div.appendChild(img)

    let span = document.createElement("span")
    span.innerText = "•"

    div.appendChild(span)

    let a = document.createElement("a")
    a.href = `pessoa${p}.jo`
    a.innerHTML = `<strong>modPessoa${p}</strong>`

    div.appendChild(a)
}

for (let p = 1; p < 7; p++) {
    let div = document.createElement("div")
    if (p == 1) {
        div.id = `user1`
    } else {
        div.id = `user`
    }
    
    viewers.appendChild(div)

    let img = document.createElement("img")
    img.src = `pessoa${p}.jpg`
    img.alt = `pessoa${p}`

    div.appendChild(img)

    let span = document.createElement("span")
    span.innerText = "•"

    div.appendChild(span)

    let a = document.createElement("a")
    a.href = `pessoa${p}.jo`
    a.innerHTML = `<strong>viewerPessoa${p}</strong>`

    div.appendChild(a)
}
*/

var res = document.getElementById("r")

var users = ["ojoojao"]
var broadcaster_id = "459116718"
var moderator_id = broadcaster_id

async function get_users() {
    let token_json = await fetch('token.json')   
    token_data = await token_json.json()

    let cred_json = await fetch('credentials.json')
    creds_data = await cred_json.json()

    let client_id = creds_data.client_id
    let token = token_data.access_token

    console.log(client_id)
    console.log(token)

    let params = new URLSearchParams()

    for (let i = 0; i < users.length; i++) {
        params.append("login", users[i])
    }
    
    let url = `https://api.twitch.tv/helix/users?${params}`
    
    let r = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            'Client-Id': client_id,
        }
    })

    var response_json = await r.json()

    res.innerHTML = response_json.data[0]
    console.log(response_json.data[0])

    get_chatters()
}

async function get_chatters() {
    let token_json = await fetch('token.json')   
    token_data = await token_json.json()

    let cred_json = await fetch('credentials.json')
    creds_data = await cred_json.json()

    let client_id = creds_data.client_id
    let token = token_data.access_token

    console.log(client_id)
    console.log(token)

    let params = new URLSearchParams()

    params.append("broadcaster_id", broadcaster_id)
    params.append("moderator_id", moderator_id)
    
    
    let url = `https://api.twitch.tv/helix/chat/chatters?${params}`
    
    let r = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            'Client-Id': client_id,
        }
    })

    var response_json = await r.json()

    res.innerHTML = response_json.data
    
    console.log(response_json.data)
}

