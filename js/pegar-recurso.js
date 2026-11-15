
import{
    MAPA, 
    TAMANHObLOCO,
    pedra,
    arvore

}from "./mapa.js" 

import{
    player
}from "./player.js"

export let numero1 = document.querySelector('[data-type="number1"]');

export let numero2 = document.querySelector('[data-type="number2"]');

let i = 0;

let contador1 = 0;
let contador2 = 0;

export let mouseClicado;

export const slotsRecursosEl = document.querySelectorAll('.slot-de-recurso');

window.onmousedown = function() { mouseClicado = true}

window.onmouseup = function() { mouseClicado = false}

export function pegarRecurso(){

    let auxX;
    let auxY;

    if(mouseClicado === true){

        let colunaBordaDireita = Math.floor((player.x + player.width +2) / TAMANHObLOCO);

        let bordaAlta = Math.floor((player.y-1) / TAMANHObLOCO);

        let bordaBaixa = Math.floor((player.y + player.height +2) / TAMANHObLOCO);
        
        let colunaBordaEsquerda = Math.floor((player.x-1) / TAMANHObLOCO);
        
        if(MAPA[bordaAlta][colunaBordaEsquerda] === 0  || MAPA[bordaBaixa][colunaBordaEsquerda] === 0 ||
            MAPA[bordaAlta][colunaBordaEsquerda] === 2  || MAPA[bordaBaixa][colunaBordaEsquerda] === 2){
                        
        
            auxX = Math.floor((player.x - player.width)/TAMANHObLOCO);
        
            auxY = Math.floor(player.y/TAMANHObLOCO);
                    
        }
                
        if(MAPA[bordaAlta][colunaBordaDireita] === 0 || MAPA[bordaBaixa][colunaBordaDireita] === 0 ||
            MAPA[bordaAlta][colunaBordaDireita] === 2 || MAPA[bordaBaixa][colunaBordaDireita] === 2){
                

            auxX = Math.floor((player.x + player.width)/TAMANHObLOCO);
            
            auxY = Math.floor(player.y/TAMANHObLOCO);
                             
        }
                    
                    
        if(MAPA[bordaAlta][colunaBordaDireita] === 0 || MAPA[bordaAlta][colunaBordaEsquerda] === 0 || 
            MAPA[bordaAlta][colunaBordaDireita] === 2 || MAPA[bordaAlta][colunaBordaEsquerda] === 2){
            
                    
            auxX = Math.floor((player.x/TAMANHObLOCO));
                    
            auxY = Math.floor((player.y - player.height)/TAMANHObLOCO);
                    
        }

                                
        if(MAPA[bordaBaixa][colunaBordaDireita] === 0 || MAPA[bordaBaixa][colunaBordaEsquerda] === 0 || 
            MAPA[bordaBaixa][colunaBordaDireita] === 2 || MAPA[bordaBaixa][colunaBordaEsquerda] === 2){

                        
            auxX = Math.floor(player.x/TAMANHObLOCO);
                        
            auxY = Math.floor((player.y + player.height)/TAMANHObLOCO);
        }
                
        if (!MAPA || !MAPA[auxY] || MAPA[auxY][auxX] === undefined) return;
                        
        let blocoAtual = MAPA[auxY][auxX];

        if(blocoAtual == 0){
            slotsRecursosEl[0].style.backgroundImage = "url('./sprites/pedra.png')";
            numero1.textContent = ++contador1;
             if(numero1.textContent < 50){
                numero1.textContent = ++contador1;
            }
        }

        if(blocoAtual == 2){
            slotsRecursosEl[1].style.backgroundImage = "url('./sprites/fundoMadeira.png')";
            if(numero2.textContent < 50){
                numero2.textContent = ++contador2;
            }
        }
    }
    


}

