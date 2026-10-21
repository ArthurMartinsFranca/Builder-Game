import {
    desenharMapa,
    MAPA,
    TAMANHObLOCO
} from "./mapa.js";

import { 
    camera, 
    atualizarCamera 
} from "./camera.js";

let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

const spritePlayer = new Image();
spritePlayer.src = "./sprites/player.png";

function redimensionarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

redimensionarCanvas();

window.addEventListener("resize", redimensionarCanvas);

const player = {
    x: 2000,
    y: 2000,
    width: 70,
    height: 70,
    vida: 100,
    velocidade: 3,
    angulo: 0,
    cor: 'brown'
}

const mouse = {
    x: 0,
    y: 0
}

const teclas = {
    w: false,
    a: false,
    s: false,
    d: false,
}

window.addEventListener("keydown", function(e) {
    if (e.key in teclas )
        teclas[e.key] = true;
})

window.addEventListener("keyup", function(e) {
    if (e.key in teclas) 
        teclas[e.key] = false;
});

window.addEventListener("mousemove", function(e) {
    const rect = canvas.getBoundingClientRect();
    
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top
})

function update() {

    let bordaAlta = Math.floor((player.y) / TAMANHObLOCO);

    let colunaBordaEsquerda = Math.floor((player.x)  / TAMANHObLOCO);

    let colunaBordaDireita = Math.floor((player.x + player.width - 1) / TAMANHObLOCO);

    let bordaBaixa = Math.floor((player.y + player.height -1) / TAMANHObLOCO);
    
    if(teclas.a == true) {
        player.x -= player.velocidade;
        
        bordaBaixa = Math.floor((player.y + player.height -1) / TAMANHObLOCO);

        colunaBordaEsquerda = Math.floor((player.x) / TAMANHObLOCO);

        if(MAPA[bordaAlta][colunaBordaEsquerda] === 0  || MAPA[bordaBaixa][colunaBordaEsquerda] === 0 ||
            MAPA[bordaAlta][colunaBordaEsquerda] === 2  || MAPA[bordaBaixa][colunaBordaEsquerda] === 2){

            player.x = (colunaBordaEsquerda * TAMANHObLOCO) + TAMANHObLOCO;
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
        }

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
        }
    }

    if (teclas.s == true) {

        bordaBaixa = Math.floor((player.y + player.height -1) / TAMANHObLOCO);

        colunaBordaEsquerda = Math.floor(player.x / TAMANHObLOCO);

        colunaBordaDireita = Math.floor((player.x + player.width -1 ) / TAMANHObLOCO);
        
        if(MAPA[bordaBaixa][colunaBordaDireita] === 0 || MAPA[bordaBaixa][colunaBordaEsquerda] === 0 || 
            MAPA[bordaBaixa][colunaBordaDireita] === 2 || MAPA[bordaBaixa][colunaBordaEsquerda] === 2){

            player.y = (bordaBaixa * TAMANHObLOCO) - player.height;
        }   

    }

    const centroX = player.x + player.width / 2;
    const centroY = player.y + player.height / 2;

    const mouseMundoX = mouse.x + camera.x;
    const mouseMundoY = mouse.y + camera.y;

    const diferencaX = mouseMundoX - centroX;
    const diferencaY = mouseMundoY - centroY;

    player.angulo = Math.atan2(diferencaY, diferencaX);

    atualizarCamera(player, canvas);
}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    ctx.translate(-camera.x, -camera.y);

    desenharMapa(ctx);

    ctx.save();

    ctx.translate(player.x + player.width / 2,
        player.y + player.height / 2
    );

    ctx.rotate(player.angulo);

    ctx.fillStyle = player.cor;

    ctx.drawImage(
        spritePlayer,
        -player.width / 2,
        -player.height / 2,
        player.width,
        player.height
    );

    ctx.restore();
    ctx.restore();
}

function loop() {
    update();
    draw();


    requestAnimationFrame(loop);
}

loop();


