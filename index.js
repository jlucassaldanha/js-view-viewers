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

async function get_users() {

    //var token_j = fetch('token.json').then(token_r => {return token_r.json()}).then(data_t => {return data_t.access_token})
    
    //var cred_j = fetch('credentials.json').then(cred_r => {return cred_r.json()}).then(data_c => {return data_c.client_id})

    var token_j = await fetch('token.json')
    var token_jd = await token_j.json()
    
    var cred_j = await fetch('credentials.json')
    var cred_jd = await cred_j.json()

    var client_id = cred_jd.client_id
    var token = token_jd.access_token
    
    console.log(cred_jd.client_id)
    console.log(token_jd.access_token)
    

    let params = new URLSearchParams()
    params.append("login", "ojoojao")
    
    let url = `https://api.twitch.tv/helix/users?${params}`
    
    var r = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            'Client-Id': client_id,
        }
    })

    let _r = document.getElementById("r")

    var rr = await r.json()

    _r.innerHTML = rr.data[0].id
    console.log(rr.data[0].id)

}

