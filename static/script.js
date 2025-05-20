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

            /*
            if (mod_or_user == "mod") {
                final_mods.push(users[user].id)

                if (antes_mods.indexOf(users[user].id) ==  -1) {
                    antes_mods.push(users[user].id)
                }

            } else if (mod_or_user == "user") {
                final_viewers.push(users[user].id)

                if (antes_viewers.indexOf(users[user].id) == -1) {
                    antes_viewers.push(users[user].id)
                }
            }
            */
        }
    }
    
    /*if (mod_or_user == "mod") {
        for (let id in antes_mods) {
            if (users.indexOf(antes_mods[id]) == -1) {
                let div = document.getElementById(`user_${antes_mods[id]}`)
                div.remove()

                let index = final_mods.indexOf(antes_mods[id])
                final_mods.splice(index, 1)
                antes_mods.splice(id, 1)
            }
        }
    
    } else if (mod_or_user == "user") {
        for (let id in antes_viewers) {
            if (users.indexOf(antes_viewers[id]) == -1) {
                let div = document.getElementById(`user_${antes_viewers[id]}`)
                div.remove()

                let index = final_viewers.indexOf(antes_viewers[id])
                final_viewers.splice(index, 1)
                antes_viewers.splice(id, 1)
            }
        }
    }*/
}

function show_espectadores() {
    let secrets_params = `client_id=${client_id}&token=${token}&scopes=${scopes}`

    let broadcaster_id = 459116718
    let query_params = `broadcaster_id=${broadcaster_id}&moderator_id=${broadcaster_id}`

    let viewers_on = JSON.parse(
        Get(`${base_url}get_viewers_on?${secrets_params}&${query_params}`)
    )

    document.getElementById("especs").innerHTML = `${viewers_on.count} Espectadores totais`

    show(viewers_on.mods, "mod")
    show(viewers_on.viewers, "user")

    console.log(final_mods, final_viewers)
    console.log(antes_mods, antes_viewers)

}

var final_mods = []
var final_viewers = []

var antes_mods = []
var antes_viewers = []

var base_url = "http://localhost:5000/api/"

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

