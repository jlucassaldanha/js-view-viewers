function Get(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()

    return request.responseText
}

function Post(url, json_data) {
    let request = new XMLHttpRequest()
    
    request.open('POST', url, true)
    request.setRequestHeader('Content-Type', 'application/json')
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            let json = JSON.parse(request.responseText)
            console.log(json)
        }
    }

    request.send(JSON.stringify(json_data))
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

            div.className = "user"
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

function send_users(users) {
    Post(`${base_url}saved_viewers`, {"ids":users})
}

function pop(readed_users, users) {
    for (let user in readed_users) {
        if (users.indexOf(readed_users[user]) == -1) {
            console.log(`Deve ser removido: ${readed_users[user]}`)
            
            let div = document.getElementById(`user_${readed_users[user]}`)
            div.remove()
        }
    }
}

function get_ids(users) {
    let ids = []
    for (let mod in users.mods) {
        ids.push(users.mods[mod].id)
    }

    for (let viewer in users.viewers) {
        ids.push(users.viewers[viewer].id)
    }

    return ids
}

function update_espectadores() {
    let secrets_params = `client_id=${client_id}&token=${token}&scopes=${scopes}`

    let broadcaster_id = 459116718
    let query_params = `broadcaster_id=${broadcaster_id}&moderator_id=${broadcaster_id}`

    let viewers_on = JSON.parse(
        Get(`${base_url}get_viewers_on?${secrets_params}&${query_params}`)
    )

    let readed_users = JSON.parse(Get(`${base_url}saved_viewers`))

    document.getElementById("especs").innerHTML = `${viewers_on.count} Espectadores totais`

    show(viewers_on.mods, "mod")
    show(viewers_on.viewers, "user")

    let users_ids = get_ids(viewers_on) 

    pop(readed_users.ids, users_ids)
    
    send_users(users_ids)

}

var base_url = "http://localhost:5000/api/"

send_users([])

var token = null
var client_id = null
var scopes = null

var nunca = true
console.log("Incio")

creds()
console.log("creds")
update_espectadores()
console.log("show")

setInterval(creds, 600000)
setInterval(update_espectadores, 60000)

console.log("main")

