import {
    MAPA,
    TAMANHObLOCO
}from "./mapa.js"

import {
    player
}from "./player.js"

import {
    moveis,
    dadosMoveis
} from "./sprites.js"

import {
    numero1,
    numero2
}from "./pegar-recurso.js"

let slots = document.querySelectorAll(".slot");
let itensMoveis = document.querySelectorAll("#painel-moveis img");
let vetorNumeros = [numero1, numero2];
let remover = false;
let quantidade = document.querySelectorAll('.qtd');
let precoEl = document.querySelectorAll('.preco');



export let construcao = {
    previa: {
        x: 0,
        y: 0,
        width: 80,
        height: 80,
        tipo: null,
    },

    construidos: [],

    moveis: [],

    moveisPrevia: {
        x: 0,
        y: 0,
        width: null,
        height: null,
        tipo: null
    }
};

itensMoveis.forEach((item, i) => {
    item.addEventListener("click", () => {
        if (construcao.moveisPrevia.tipo === i) {
            construcao.moveisPrevia.tipo = null;
        } else {
            construcao.moveisPrevia.tipo = i;
        }

        construcao.moveisPrevia.width = dadosMoveis[i].largura;

        construcao.moveisPrevia.height =
            dadosMoveis[i].largura *
            (moveis[i].naturalHeight / moveis[i].naturalWidth);
    });
});

function podeConstruir(bloco) {
    let colunaInicial = Math.floor(bloco.x / TAMANHObLOCO);
    let colunaFinal = Math.ceil((bloco.x + bloco.width) / TAMANHObLOCO) - 1;

    let linhaInicial = Math.floor(bloco.y / TAMANHObLOCO);
    let linhaFinal = Math.ceil((bloco.y + bloco.height) / TAMANHObLOCO) - 1;

    for (let i = linhaInicial; i <= linhaFinal; i++) {
        for (let j = colunaInicial; j <= colunaFinal; j++) {

            if (!MAPA[i] || MAPA[i][j] === undefined) {
                return false;
            }

            if (MAPA[i][j] === 0 || MAPA[i][j] === 2) {
                return false;
            }
        }
    }

    return true;
}

for(let i = 0; i < 5; i++){
    
    let preconumero = Number(precoEl[i].textContent.replace(/\D/g,''));
    let j = 0;
    let slot = slots[i];

    slot.addEventListener("click", function(){

        let qtdnumero = Number(quantidade[i].textContent);

        if(precoEl[i].textContent.includes('MADEIRA') === true){

            j = 1;

        }

        else{
            j = 0;
        }

        let numero1nu = Number(vetorNumeros[j].textContent);

        if(numero1nu >= preconumero){

            qtdnumero += 5;

            numero1nu -= preconumero;

        }

        vetorNumeros[j].textContent = numero1nu;

        quantidade[i].textContent = qtdnumero;
    });
  
}


slots.forEach(function(slot, i) {

    slot.addEventListener("click", function() {

        let qtdnumero = Number(quantidade[i].textContent);

        if(qtdnumero <= 0){
            return;
        }
        
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
    construcao.moveisPrevia.tipo = null;
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
    if (construcao.moveisPrevia.tipo !== null) {

        let movel = {
            x: construcao.moveisPrevia.x,
            y: construcao.moveisPrevia.y,
            width: construcao.moveisPrevia.width,
            height: construcao.moveisPrevia.height,
            tipo: construcao.moveisPrevia.tipo
        };

        if (!podeConstruirTudo(movel)) return;
    
        construcao.moveis.push(movel);
        return
    }


    if (construcao.previa.tipo === null) return;

    let qtdnumero = Number(quantidade[construcao.previa.tipo].textContent);

    if(qtdnumero === 0){

        return;
    }

    let bloco = {
        x: construcao.previa.x,
        y: construcao.previa.y,
        width: 80,
        height: 80,
        tipo: construcao.previa.tipo,
        chao: false
    };


    if (bloco.tipo <= 1 && bloco.tipo >=0) {
        bloco.chao = true;
    }
    
    if (!podeConstruirTudo(bloco)) return;
    
    construcao.construidos.push(bloco);

    qtdnumero--;

    if(qtdnumero <= 0){

        qtdnumero = 0;
    }

    quantidade[construcao.previa.tipo].textContent = qtdnumero;
    
});

function podeConstruirSemPlayer(bloco) {
    if (
        player.x < bloco.x + bloco.width &&
        player.x + player.width > bloco.x &&
        player.y < bloco.y + bloco.height &&
        player.y + player.height > bloco.y
    ) {
        return false;
    }

    return true;
}

function podeConstruirTudo(bloco) {
    if (!podeConstruir(bloco)) return false;
    if (!podeConstruirSemPlayer(bloco)) return false;

    return true;
}
