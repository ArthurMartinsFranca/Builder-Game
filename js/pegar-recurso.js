
import{
    MAPA, 
    TAMANHObLOCO,
    pedra,
    arvore

}from "./mapa.js" 

export let mouseClicado;



export const slotsRecursosEl = document.querySelectorAll('.slot-de-recurso');

window.onmousedown = function() { mouseClicado = true}

export function pegarRecurso(auxX, auxY){
    
    if (!MAPA || !MAPA[auxY] || MAPA[auxY][auxX] === undefined) return;

    let blocoAtual = MAPA[auxY][auxX];

    if(mouseClicado === true){
        if(blocoAtual == 0){
            slotsRecursosEl[0].style.backgroundImage =  "url('pedra.png')";
        }

        if(blocoAtual == 2){
            slotsRecursosEl[0].style.backgroundImage = "url('arvore.png')";
        }
    }
    
    window.onmouseup = function() { mouseClicado = false}


}

