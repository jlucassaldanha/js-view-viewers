/*
https://pythonve.ikitai.net/entry/2024/10/04/040000
https://medium.com/@fauzik354313/building-website-using-flask-html-javascript-and-python-study-case-791e336265f2
https://medium.com/@wiliansilva/comunica%C3%A7%C3%A3o-com-python-utilizando-node-js-bafaf6cd1b59
*/

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

function show(users, mod_or_user) {
    let section = null
    if (mod_or_user == 'mod') {
        section = document.getElementById('modsUsers')
        let p = document.getElementById("userMods")

        p.innerHTML = `${users.length} moderadores`

    } else if (mod_or_user == 'user') {
        section = document.getElementById('viewersUsers')
        let p = document.getElementById("userViews")

        p.innerHTML = `${users.length} espectadores`
    }

    for (let user in users) {
        if (document.getElementById(`user_${users[user].id}`) == null) {
            let div = document.createElement('div')

            div.id = `user_${users[user].id}`

            if (user == 0) {
                div.className = "user1"
            } else {
                div.className = "user"
            }
            section.appendChild(div)
            
            // div
            let img = document.createElement('img')
            img.src = users[user].profile_img_url
            img.alt = users[user].username
            div.appendChild(img)

            let span = document.createElement("span")
            span.innerText = "•"
            div.appendChild(span)

            let a = document.createElement("a")
            a.href = `https://www.twitch.tv/${users[user].username}`
            a.innerHTML = `<strong class="user">${users[user].username}</strong>`
            a.target = "_blank"
            div.appendChild(a)
        }
    }
}

function show_espectadores() {
    let secrets_params = `client_id=${client_id}&token=${token}&scopes=${scopes}`

    let broadcaster_id = 459116718
    let query_params = `broadcaster_id=${broadcaster_id}&moderator_id=${broadcaster_id}`

    let viewers_on = JSON.parse(
        Get(`${base_url}get_viewers_on?${secrets_params}&${query_params}`)
    )

    document.getElementById("especs").innerHTML = `<strong>Espectadores totais: ${viewers_on.count}</strong>`

    show(viewers_on.mods, "mod")
    show(viewers_on.viewers, "user")
}

var base_url = "http://127.0.0.1:5000/api/"

var token = null
var client_id = null
var scopes = null

var nunca = true
console.log("Incio")

creds()
console.log("creds")
show_espectadores()
console.log("show")

setInterval(creds, 600000)
setInterval(show_espectadores, 60000)

console.log("main")

