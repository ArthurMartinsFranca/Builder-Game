import {
    mouse
}from "./input.js"

let slots = document.querySelectorAll(".slot");

export let construcao = {
    previa: {
        x: 0,
        y: 0,
        width: 80,
        height: 80,
        tipo: null
    },

    construidos: [],
};

let remover = false;

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

    construcao.construidos.push({
        x: construcao.previa.x,
        y: construcao.previa.y,
        width: 80,
        height: 80,
        tipo: construcao.previa.tipo
    });
});
