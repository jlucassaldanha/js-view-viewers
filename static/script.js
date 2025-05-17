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
*/
var base_url = "http://127.0.0.1:5000/api/"

var token = null
var client_id = null
var scopes = null
var viewers_on = null
var users_info = null

function Get(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()

    return request.responseText
}

function creds() {
    let secrets = JSON.parse(Get(`${base_url}credentials`))

    client_id = secrets.client_id
    token = secrets.token
    scopes = secrets.scopes

    return [secrets.client_id, secrets.token, secrets.scopes]
}

function get_viewers() {
    let secrets_params = `client_id=${client_id}&token=${token}&scopes=${scopes}`

    let broadcaster_id = 459116718
    let query_params = `broadcaster_id=${broadcaster_id}&moderator_id=${broadcaster_id}`

    viewers_on = JSON.parse(
        Get(`${base_url}get_viewers_on?${secrets_params}&${query_params}`)
    )

    return viewers_on
}

function get_users(ids) {
    let secrets_params = `client_id=${client_id}&token=${token}&scopes=${scopes}`

    let query_params = `id=${ids[0]}`
    ids = ids.slice(1)

    for (let id in ids) {
        query_params += `&id=${ids[id]}`
    }

    users_info = JSON.parse(
        Get(`${base_url}get_users?${secrets_params}&${query_params}`)
    )

    return users_info
}

function main() {
    let inicio_creds = new Date().getTime()
    creds()

    let inicio = new Date().getTime()
    get_viewers()
    //console.log(viewers_on)
    //console.log(viewers_on.all_viewers_ids)
    get_users(viewers_on.all_viewers_ids)
    console.log(users_info.data)

    while (true) {
        if ((new Date().getTime() - inicio_creds) > 10000) {
            inicio_creds = new Date().getTime()
            creds()
        }

        if ((new Date().getTime() - inicio) > 5000) {
            inicio = new Date().getTime()
            get_viewers()
            //console.log(viewers_on)
            //console.log(viewers_on.all_viewers_ids)
            get_users(viewers_on.all_viewers_ids)
            console.log(users_info.data)
        }
    
    }
    
}

main()