import {
    mouse
}from "./input.js"

let $slots = $(".slots");

export let blocos = {
    x: 0,
    y: 0,
    width: 80,
    height: 80,
    tipo: null
}

$slots.each(function(i) {
    this.addEventListener("click", function() {
        blocos.tipo = i;
    });
});
