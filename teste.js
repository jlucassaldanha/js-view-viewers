var final = [] // ta no html (proprio html)

var antes = [] // Lista de ids adicionados

var ids = ["111", "222", "333"] // Dados vindos da api

// Primeiro
console.log("inicio: " + final)

for (let id in ids) {
    if (final.indexOf(ids[id]) == -1) {
        final.push(ids[id]) // Coloca no html

        if (antes.indexOf(ids[id]) == -1) {
            antes.push(ids[id]) // Coloca na lista de ids que estão no html
        }
    }
}

for (let a in antes) { // Percorre a lista do que esta no html
    if (ids.indexOf(antes[a]) == -1) { // se oq esta no html não esta no que veio da api
        let index = final.indexOf(antes[a]) // pega o lugar q ta no html
        final.splice(index, 1) // E tira do html
        antes.splice(a, 1) // Além disso tira da lista de adicionados
    }
}

console.log("Primeira: "+final)
console.log(antes)
console.log(" ")

// segundo
var ids = ["111", "222", "333", "444"]

for (let id in ids) {
    if (final.indexOf(ids[id]) == -1) {
        final.push(ids[id])

        if (antes.indexOf(ids[id]) == -1) {
            antes.push(ids[id])
        }
    }
}

for (let a in antes) {
    if (ids.indexOf(antes[a]) == -1) {
        let index = final.indexOf(antes[a])
        final.splice(index, 1)
        antes.splice(a, 1) 
    }
}

console.log("Segunda: "+final)
console.log(antes)
console.log(" ")


// terceiro
var ids = ["111", "333"]

for (let id in ids) {
    if (final.indexOf(ids[id]) == -1) {
        final.push(ids[id])

        if (antes.indexOf(ids[id]) == -1) {
            antes.push(ids[id])
        }
    }
}

for (let a in antes) {
    if (ids.indexOf(antes[a]) == -1) {
        let index = final.indexOf(antes[a])
        final.splice(index, 1)
        antes.splice(a, 1) 
    }
}

console.log("Terceira: " + final)
console.log(antes)
console.log(" ")


// quarto
var ids = ["111", "333", "222"]

for (let id in ids) {
    if (final.indexOf(ids[id]) == -1) {
        final.push(ids[id])

        if (antes.indexOf(ids[id]) == -1) {
            antes.push(ids[id])
        }
    }
}

for (let a in antes) {
    if (ids.indexOf(antes[a]) == -1) {
        let index = final.indexOf(antes[a])
        final.splice(index, 1)
        antes.splice(a, 1)
    }
}

console.log("Quarta: " + final)
console.log(antes)
console.log(" ")