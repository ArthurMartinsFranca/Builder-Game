import {
    MAPA,
    TAMANHObLOCO
}from "./mapa.js"

import {
    player
}from "./player.js"

let slots = document.querySelectorAll(".slot");
let remover = false;

export let construcao = {
    previa: {
        x: 0,
        y: 0,
        width: 80,
        height: 80,
        tipo: null,
    },

    construidos: [],
};

function podeConstruir(bloco) {
    let colunaInicial = Math.floor(bloco.x / TAMANHObLOCO);
    let colunaFinal = Math.ceil((bloco.x + bloco.width) / TAMANHObLOCO) - 1;

    let linhaInicial = Math.floor(bloco.y / TAMANHObLOCO);
    let linhaFinal = Math.ceil((bloco.y + bloco.height) / TAMANHObLOCO) - 1;

    for (let i = linhaInicial; i <= linhaFinal; i++) {
        for (let j = colunaInicial; j <= colunaFinal; j++) {

            if (!MAPA[i] || MAPA[i][j] === undefined) {
                return false;
            }

            if (MAPA[i][j] === 0 || MAPA[i][j] === 2) {
                return false;
            }
        }
    }

    return true;
}

slots.forEach(function(slot, i) {
    slot.addEventListener("click", function() {
        remover = false;

        if (construcao.previa.tipo === i) {
            construcao.previa.tipo = null;
        } else {
            construcao.previa.tipo = i;
        }
    });
});

document.querySelector("#remover").addEventListener("click", function() {
    remover = true;
    construcao.previa.tipo = null;
});

window.addEventListener("click", function(event) {
    if (event.target !== document.querySelector("#canvas")) return;

    if (remover) {
        for (let i = 0; i < construcao.construidos.length; i++) {
            let bloco = construcao.construidos[i];

            if (
                construcao.previa.x === bloco.x &&
                construcao.previa.y === bloco.y
            ) {
                construcao.construidos.splice(i, 1);
                break;
            }
        }

        return;
    }


    if (construcao.previa.tipo === null) return;

    let bloco = {
        x: construcao.previa.x,
        y: construcao.previa.y,
        width: 80,
        height: 80,
        tipo: construcao.previa.tipo,
        chao: false
    };

    if (bloco.tipo <= 1 && bloco.tipo >=0) {
        bloco.chao = true;
    }
    
    if (!podeConstruir(bloco)) return;
    if (!podeConstruirSemPlayer(bloco)) return;
    
    construcao.construidos.push(bloco);
});

function podeConstruirSemPlayer(bloco) {
    if (
        player.x < bloco.x + bloco.width &&
        player.x + player.width > bloco.x &&
        player.y < bloco.y + bloco.height &&
        player.y + player.height > bloco.y
    ) {
        return false;
    }

    return true;
}
