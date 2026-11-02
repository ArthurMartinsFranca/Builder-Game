import {
    mouse
}from "./input.js"

let slots = document.querySelectorAll(".slots");

export let construcao = {
    selecionado: null,

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
        construcao.selecionado = i;
        construcao.previa.tipo = i;
    });
});

construcao.construidos.push({
    x: 160,
    y: 240,
    width: 80,
    height: 80,
    tipo: 2
});

construcao.construidos.push({
    x: 240,
    y: 240,
    width: 80,
    height: 80,
    tipo: 2
});
