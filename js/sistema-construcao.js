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

let vetorNumeros = [numero1, numero2];
let remover = false;

let slots = document.querySelectorAll("#inventario .slot:not(#remover)");
let itensMoveis = document.querySelectorAll("#painel-moveis img");

let quantidade = document.querySelectorAll('.qtd');
let precoEl = document.querySelectorAll('.preco');

let precoMoveis = document.querySelectorAll("#painel-moveis .precoMoveis");
let quantidadeMoveis = document.querySelectorAll("#painel-moveis [data-type]");

let botoesCompraBlocos = document.querySelectorAll(".comprar-bloco");
let botoesCompraMoveis = document.querySelectorAll(".comprar-movel");

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

        let qtd = Number(quantidadeMoveis[i].textContent);

        if (qtd <= 0) return;

        if (construcao.moveisPrevia.tipo === i) {
            construcao.moveisPrevia.tipo = null;
            return;
        }

        construcao.moveisPrevia.tipo = i;

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

for (let i = 0; i < 5; i++) {

    let preco = Number(precoEl[i].textContent.replace(/\D/g, ""));

    botoesCompraBlocos[i].addEventListener("click", function(event) {

        event.stopPropagation();

        let j = precoEl[i].textContent.includes("MADEIRA") ? 1 : 0;

        let recurso = Number(vetorNumeros[j].textContent);

        if (recurso < preco) return;

        let qtd = Number(quantidade[i].textContent);

        qtd += 5;
        recurso -= preco;

        quantidade[i].textContent = qtd;
        vetorNumeros[j].textContent = recurso;
    });
}

for (let i = 0; i < itensMoveis.length; i++) {

    let preco = Number(precoMoveis[i].textContent.replace(/\D/g, ""));

    botoesCompraMoveis[i].addEventListener("click", function(event) {

        event.stopPropagation();

        let j = precoMoveis[i].textContent.includes("MADEIRA") ? 1 : 0;

        let recurso = Number(vetorNumeros[j].textContent);
        let qtd = Number(quantidadeMoveis[i].textContent);

        if (recurso < preco) return;

        qtd++;
        recurso -= preco;

        vetorNumeros[j].textContent = recurso;
        quantidadeMoveis[i].textContent = qtd;
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

        for (let i = 0; i < construcao.moveis.length; i++) {
            let movel = construcao.moveis[i];
    
            if (
                construcao.moveisPrevia.x >= movel.x &&
                construcao.moveisPrevia.x <= movel.x + movel.width &&
                construcao.moveisPrevia.y >= movel.y &&
                construcao.moveisPrevia.y <= movel.y + movel.height
            ) {
                devolverRecursos(movel.tipo, true);
                construcao.moveis.splice(i, 1);
                return
            }
            
        }
    
        for (let i = 0; i < construcao.construidos.length; i++) {
            let bloco = construcao.construidos[i];
    
            if (
                construcao.previa.x === bloco.x &&
                construcao.previa.y === bloco.y
            ) {
                devolverRecursos(bloco.tipo);
                construcao.construidos.splice(i, 1);
                return;
            }
           
        }
    
        return;
    }

    if (construcao.moveisPrevia.tipo !== null) {

        let tipo = construcao.moveisPrevia.tipo;
    
        let qtd = Number(quantidadeMoveis[tipo].textContent);
    
        if (qtd <= 0) return;
    
        let movel = {
            x: construcao.moveisPrevia.x,
            y: construcao.moveisPrevia.y,
            width: construcao.moveisPrevia.width,
            height: construcao.moveisPrevia.height,
            tipo: tipo
        };
    
        if (!podeConstruirTudo(movel)) return;
    
        construcao.moveis.push(movel);
    
        qtd--;
    
        quantidadeMoveis[tipo].textContent = qtd;
    
        if (qtd === 0) {
            construcao.moveisPrevia.tipo = null;
        }
    
        return;
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

function podeColocarMovel(movel) {

    for (let i = 0; i < construcao.construidos.length; i++) {
        let outroBloco = construcao.construidos[i];
    
        if (outroBloco.chao) continue;
    
        if (
            movel.x < outroBloco.x + outroBloco.width &&
            movel.x + movel.width > outroBloco.x &&
            movel.y < outroBloco.y + outroBloco.height &&
            movel.y + movel.height > outroBloco.y
        ) {
            return false;
        }
    }

    for (let i = 0; i < construcao.moveis.length; i++) {
        let outroMovel = construcao.moveis[i];
    
        if (
            movel.x < outroMovel.x + outroMovel.width &&
            movel.x + movel.width > outroMovel.x &&
            movel.y < outroMovel.y + outroMovel.height &&
            movel.y + movel.height > outroMovel.y
        ) {
            return false;
        }
    }
    
    return true;
}

function devolverRecursos(tipo, movel = false) {
    let elemento = movel ? precoMoveis[tipo] : precoEl[tipo];

    let preco = Number(elemento.textContent.replace(/\D/g, ""));
    preco = Math.floor(preco / 5);
    let madeira = elemento.textContent.includes("MADEIRA");

    let recurso = madeira ? 1 : 0;

    let atual = Number(vetorNumeros[recurso].textContent);

    vetorNumeros[recurso].textContent = atual + preco;
}

function podeConstruirTudo(bloco) {
    if (!podeConstruir(bloco)) return false;
    if (!podeConstruirSemPlayer(bloco)) return false;
    if (!podeColocarMovel(bloco)) return false;

    return true;
}
