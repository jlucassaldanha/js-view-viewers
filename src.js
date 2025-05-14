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