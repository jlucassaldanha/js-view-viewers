/*
https://pythonve.ikitai.net/entry/2024/10/04/040000
https://medium.com/@fauzik354313/building-website-using-flask-html-javascript-and-python-study-case-791e336265f2
https://medium.com/@wiliansilva/comunica%C3%A7%C3%A3o-com-python-utilizando-node-js-bafaf6cd1b59
*/
/*
function init() {
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
        img.src = `static/pessoa${p}.jpg`
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
        img.src = `static/pessoa${p}.jpg`
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

}
    let secrets = creds()

    let token = secrets[1]
    let client_id = secrets[0]
    let scopes = secrets[2]
    
    let base_url = "http://127.0.0.1:5000/api/"
    let request_type = "get_viewers_on"
    let secrets_params = `client_id=${client_id}&token=${token}&scopes=${scopes}`
    
    //let request_type = "get_users"
    //let query_params = `login=ojoojao`
    //let data = Get(`${base_url}${request_type}?${secrets_params}&${query_params}`)
    //let broadcaster_id = JSON.parse(data).data[0].id
    

    let broadcaster_id = 459116718
    query_params = `broadcaster_id=${broadcaster_id}&moderator_id=${broadcaster_id}`
    
    data = Get(`${base_url}${request_type}?${secrets_params}&${query_params}`)

    let viewers_on = JSON.parse(data)
    
    console.log(viewers_on)
*/

var token = null
var client_id = null
var scopes = null
var viewers_on = null

function Get(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()

    return request.responseText
}

function creds() {
    let data = Get("http://127.0.0.1:5000/api/credentials")
    let secrets = JSON.parse(data)

    client_id = secrets.client_id
    token = secrets.token
    scopes = secrets.scopes

    console.log(client_id, token, scopes)

    return [secrets.client_id, secrets.token, secrets.scopes]
}

function get_viewers_on() {
    let base_url = "http://127.0.0.1:5000/api/"
    let request_type = "get_viewers_on"
    let secrets_params = `client_id=${client_id}&token=${token}&scopes=${scopes}`

    let broadcaster_id = 459116718
    query_params = `broadcaster_id=${broadcaster_id}&moderator_id=${broadcaster_id}`
    
    data = Get(`${base_url}${request_type}?${secrets_params}&${query_params}`)

    viewers_on = JSON.parse(data)
    
    console.log(viewers_on)

    return viewers_on
}


function main() {
    window.setInterval(creds(), 600000)
    
    window.setInterval(get_viewers_on(), 300000)
}

main()