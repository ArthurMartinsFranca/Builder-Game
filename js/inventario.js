import { MAPA, TAMANHObLOCO, pedra} from "./mapa";

let mouseClicado = false;

window.onmousedown = function() { mouseClicado = true}

window.onmouseup = function() { mouseClicado = false}

export const slotsEl = document.querySelectorAll('.slot');

export function quebrar(){

    if(mouseClicado === true){
        
        if((diferncaY/TAMANHObLOCO) <= 2){

            let bordaAlta = Math.floor((player.y) / TAMANHObLOCO);
    
            let colunaBordaEsquerda = Math.floor((player.x)  / TAMANHObLOCO);
    
            let colunaBordaDireita = Math.floor((player.x + player.width - 1) / TAMANHObLOCO);
    
            let bordaBaixa = Math.floor((player.y + player.height -1) / TAMANHObLOCO);

            if(MAPA[bordaAlta][colunaBordaEsquerda] === 0 || MAPA[bordaAlta+1][colunaBordaEsquerda] === 0 || MAPA[bordaAlta][colunaBordaDireita] === 0 || MAPA[bordaAlta+1][colunaBordaDireita] === 0 ){
            
                slotsEl.backgroundImage = pedra.spritePedra;
                
            }

        }
    }    
};

for(let i = 0; i < 5; i++){

    slotsEl[i].addEventListener('click', () =>{

        for(let j = 0; j < 5; j++){

            slotsEl[j].style.backgroundColor = '';

        }

        slotsEl[i].style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        
    });

}




