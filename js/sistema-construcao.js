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

slots.forEach(function(slot, i) {
    slot.addEventListener("click", function() {

        if (construcao.previa.tipo === i) {
            construcao.previa.tipo = null;
        } else {
            construcao.previa.tipo = i;
        }

    });
});

window.addEventListener("click", function() {
    if (event.target !== document.querySelector("#canvas")) return;

    if (construcao.previa.tipo === null) {
        return;
    }
    construcao.construidos.push({
        x: construcao.previa.x,
        y: construcao.previa.y,
        width: 80,
        height: 80,
        tipo: construcao.previa.tipo
    });
})

