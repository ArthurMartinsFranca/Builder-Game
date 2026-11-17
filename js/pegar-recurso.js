
import{
    MAPA, 
    TAMANHObLOCO,

}from "./mapa.js" 

import{
    player
}from "./player.js"

export let numero1 = document.querySelector('[data-type="number1"]');

export let numero2 = document.querySelector('[data-type="number2"]');

export let mouseClicado;

export const slotsRecursosEl = document.querySelectorAll('.slot-de-recurso');

window.onmousedown = function() { mouseClicado = true}

window.onmouseup = function() { mouseClicado = false}

let vidasMAPA = MAPA.map(linha => linha.map(bloco => (bloco === 0 ?  50 : bloco === 2 ? 50 : 0)));
let tempo_coleta = 0;
const TEMPO_RECARGA = 200;

export function pegarRecurso(){

    let numero1aux = Number(numero1.textContent);
    let numero2aux = Number(numero2.textContent)

    let agora = Date.now();

    if(agora - tempo_coleta < TEMPO_RECARGA){

        return;
    }

    let auxX;
    let auxY;
    

    if(mouseClicado === true){

        let colunaBordaDireita = Math.floor((player.x + player.width +2) / TAMANHObLOCO);

        let bordaAlta = Math.floor((player.y-1) / TAMANHObLOCO);

        let bordaBaixa = Math.floor((player.y + player.height +2) / TAMANHObLOCO);
        
        let colunaBordaEsquerda = Math.floor((player.x-1) / TAMANHObLOCO);
        
        if(MAPA[bordaAlta][colunaBordaEsquerda] === 0  || MAPA[bordaAlta][colunaBordaEsquerda] === 2) {
                        
            auxX = colunaBordaEsquerda
        
            auxY = bordaAlta
                    
        }
                
        else if(MAPA[bordaAlta][colunaBordaDireita] === 0 || MAPA[bordaAlta][colunaBordaDireita] === 2){
                

            auxX = colunaBordaDireita
            
            auxY = bordaAlta
                             
        }
                    
                    
        else if(MAPA[bordaBaixa][colunaBordaEsquerda] === 0 || MAPA[bordaBaixa][colunaBordaEsquerda] === 2){
            
                    
            auxX = colunaBordaEsquerda
                    
            auxY = bordaBaixa
                    
        }

                                
        else if(MAPA[bordaBaixa][colunaBordaDireita] === 0 || MAPA[bordaBaixa][colunaBordaDireita] === 2){
     
            auxX = colunaBordaDireita
                        
            auxY = bordaBaixa
        }
        
        if (!MAPA || !MAPA[auxY] || MAPA[auxY][auxX] === undefined) return;

        let blocoAtual = MAPA[auxY][auxX];

        if(blocoAtual == 0){
            slotsRecursosEl[0].style.backgroundImage = "url('./sprites/fundopedra.png')";

            vidasMAPA[auxY][auxX] -= 1 ;

            if(vidasMAPA[auxY][auxX] <= 0){

                MAPA[auxY][auxX] = 1;

            }
            
            if(numero1aux < 999){

                numero1aux++;

                numero1.textContent = numero1aux

                tempo_coleta = agora;
            }
        }

        if(blocoAtual == 2){
            slotsRecursosEl[1].style.backgroundImage = "url('./sprites/fundoMadeira.png')";
            
            vidasMAPA[auxY][auxX] -= 1;

            if(vidasMAPA[auxY][auxX] <= 0){

                MAPA[auxY][auxX] = 1;

            }
            
            if(numero2aux < 999){

                numero2aux++;

                numero2.textContent = numero2aux;

                tempo_coleta = agora;
            }
        }
    }
    
}
