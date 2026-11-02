
import {
    desenharMapa,
    MAPA,
    TAMANHObLOCO
} from "./mapa.js";

import { 
    camera, 
    atualizarCamera 
} from "./camera.js";

import {
    mouse,
    teclas
} from "./input.js"

import {
    draw,
    canvas,
    ctx,
    redimensionarCanvas
}from "./draw.js"

import {
    spritePlayer,
    player
}from "./player.js"

import {
    construcao
}from "./sistema-construcao.js"
import { slotsRecursosEl } from "./pegar-recurso.js";

import {
    pegarRecurso,
    mouseClicado
}from "./pegar-recurso.js"


redimensionarCanvas();


window.addEventListener("resize", redimensionarCanvas);


function update() {

    let auxX;
    let auxY;

    let bordaAlta = Math.floor((player.y) / TAMANHObLOCO);

    let colunaBordaEsquerda = Math.floor((player.x)  / TAMANHObLOCO);

    let colunaBordaDireita = Math.floor((player.x + player.width - 1) / TAMANHObLOCO);

    let bordaBaixa = Math.floor((player.y + player.height -1) / TAMANHObLOCO);

    let xAnterior = player.x;
    
    if(teclas.a == true) {
        player.x -= player.velocidade;
        
        bordaBaixa = Math.floor((player.y + player.height -1) / TAMANHObLOCO);

        colunaBordaEsquerda = Math.floor((player.x) / TAMANHObLOCO);

        if(MAPA[bordaAlta][colunaBordaEsquerda] === 0  || MAPA[bordaBaixa][colunaBordaEsquerda] === 0 ||
            MAPA[bordaAlta][colunaBordaEsquerda] === 2  || MAPA[bordaBaixa][colunaBordaEsquerda] === 2){
                
            player.x = (colunaBordaEsquerda * TAMANHObLOCO) + TAMANHObLOCO;  

            auxX = Math.floor((player.x - player.width)/TAMANHObLOCO);

            auxY = Math.floor(player.y/TAMANHObLOCO);
            
        }
    }

    if(teclas.d == true) {
        player.x += player.velocidade;

        bordaAlta = Math.floor((player.y) / TAMANHObLOCO);
        
        bordaBaixa = Math.floor((player.y + player.height -1 ) / TAMANHObLOCO);

        colunaBordaDireita = Math.floor((player.x + player.width - 1 )  / TAMANHObLOCO);

        if(MAPA[bordaAlta][colunaBordaDireita] === 0 || MAPA[bordaBaixa][colunaBordaDireita] === 0 ||
            MAPA[bordaAlta][colunaBordaDireita] === 2 || MAPA[bordaBaixa][colunaBordaDireita] === 2){

            player.x = (colunaBordaDireita * TAMANHObLOCO) - player.width;

            auxX = Math.floor((player.x + player.width)/TAMANHObLOCO);

            auxY = Math.floor(player.y/TAMANHObLOCO);
           
        }

    }
 if (
        (teclas.a || teclas.d) &&
        colidiuComConstrucao(player.x, player.y)
    ) {
        player.x = xAnterior;
    }

    if (player.x < 0) {
        player.x = 0;
    }

    if (player.x + player.width > MAPA[0].length * TAMANHObLOCO) {
        player.x = MAPA[0].length * TAMANHObLOCO - player.width;
    }

    if (player.y + player.height > MAPA.length * TAMANHObLOCO - 2) {
        player.y = MAPA.length * TAMANHObLOCO - player.height - 4;
    }

    let yAnterior = player.y;

    if (teclas.w == true) {

        player.y -= player.velocidade;
    }

    if (teclas.s == true) {

        player.y += player.velocidade;
    }

    if (player.y < 0) {
        player.y = 0;
    }


    if (teclas.w == true) {

        bordaAlta = Math.floor((player.y) / TAMANHObLOCO);

        colunaBordaEsquerda = Math.floor((player.x)  / TAMANHObLOCO);

        colunaBordaDireita = Math.floor((player.x + player.width - 1) / TAMANHObLOCO);

        if(MAPA[bordaAlta][colunaBordaDireita] === 0 || MAPA[bordaAlta][colunaBordaEsquerda] === 0 || 
            MAPA[bordaAlta][colunaBordaDireita] === 2 || MAPA[bordaAlta][colunaBordaEsquerda] === 2){

            player.y = (bordaAlta * TAMANHObLOCO) + TAMANHObLOCO;

            auxX = Math.floor((player.x/TAMANHObLOCO));

            auxY = Math.floor((player.y - player.height)/TAMANHObLOCO);
        }

    }

    if (teclas.s == true) {

        bordaBaixa = Math.floor((player.y + player.height -1) / TAMANHObLOCO);

        colunaBordaEsquerda = Math.floor(player.x / TAMANHObLOCO);

        colunaBordaDireita = Math.floor((player.x + player.width -1 ) / TAMANHObLOCO);
        
        if(MAPA[bordaBaixa][colunaBordaDireita] === 0 || MAPA[bordaBaixa][colunaBordaEsquerda] === 0 || 
            MAPA[bordaBaixa][colunaBordaDireita] === 2 || MAPA[bordaBaixa][colunaBordaEsquerda] === 2){

            player.y = (bordaBaixa * TAMANHObLOCO) - player.height;

            auxX = Math.floor(player.x/TAMANHObLOCO);

            auxY = Math.floor((player.y + player.height)/TAMANHObLOCO);
        }   

    }
        pegarRecurso(auxX, auxY);

    if (
        (teclas.w || teclas.s) &&
        colidiuComConstrucao(player.x, player.y)
    ) {
        player.y = yAnterior;
    }

    const centroX = player.x + player.width / 2;
    const centroY = player.y + player.height / 2;

    const mouseMundoX = mouse.x + camera.x;
    const mouseMundoY = mouse.y + camera.y;

    const diferencaX = mouseMundoX - centroX;
    const diferencaY = mouseMundoY - centroY;

    player.angulo = Math.atan2(diferencaY, diferencaX);

    atualizarCamera(player, canvas);

    construcao.previa.x = Math.floor(mouseMundoX / construcao.previa.width) * construcao.previa.width;

    construcao.previa.y = Math.floor(mouseMundoY / construcao.previa.width) * construcao.previa.width;
}

function colidiuComConstrucao(x, y) {
    for (let bloco of construcao.construidos) {
        if (
            x < bloco.x + bloco.width &&
            x + player.width > bloco.x &&
            y < bloco.y + bloco.height &&
            y + player.height > bloco.y
        ) {
            return true;
        }
    }

    return false;
}

function loop() {
    update();

    draw(player, camera, spritePlayer, desenharMapa, construcao);

    requestAnimationFrame(loop);
}

loop();
