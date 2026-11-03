
import{
    MAPA, 
    TAMANHObLOCO,
    pedra,
    arvore

}from "./mapa.js" 

let i = 0;

let contador1 = 0;

export let mouseClicado;

export const slotsRecursosEl = document.querySelectorAll('.slot-de-recurso');

window.onmousedown = function() { mouseClicado = true}

export function pegarRecurso(auxX, auxY){
 
    if (!MAPA || !MAPA[auxY] || MAPA[auxY][auxX] === undefined) return;

    let blocoAtual = MAPA[auxY][auxX];

    if(mouseClicado === true){

        contador1++;

        if(blocoAtual == 0){
            slotsRecursosEl[i].style.backgroundImage = "url('./sprites/pedra.png')";
        }

        if(blocoAtual == 2){
            slotsRecursosEl[i].style.backgroundImage = "url('./sprites/fundoMadeira.png')";
        }
        
    }

    if(contador1 === 10){

        i = 1;

    }
    
    window.onmouseup = function() { mouseClicado = false}


}

