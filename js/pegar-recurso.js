
import{
    MAPA, 
    TAMANHObLOCO,
    pedra,
    arvore

}from "./mapa.js" 

window.onmousedown = function() { mouseClicado = true}

window.onmouseup = function() { mouseClicado = false}

export const slotsRecursosEl = document.querySelectorAll('.slot-de-recurso');

function pegarRecurso(auxX, auxY){

    blocoAtual = MAPA[auxY][auxX];

    if(mouseClicado === true){
        if(blocoAtual == 0){
            slotsRecursosEl[0].style.backgroundImage = pedra.src;
        }

        if(blocoAtual == 2){
            slotsRecursosEl[0].style.backgroundImage = pedra.src;
        }
    }
}
