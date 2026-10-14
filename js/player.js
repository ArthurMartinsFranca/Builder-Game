let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

const player = {
    x: 100,
    y: 100,
    width: 40,
    height: 40,

    velocidade: 4,

    cor: 'red'
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

function update() {
    if (teclas.w == true) {
        player.y -= player.velocidade;

    }
    if(teclas.a == true) {
        player.x -= player.velocidade;
    }
    if(teclas.d == true) {
        player.x += player.velocidade;
    }
    if (teclas.s == true) {

        player.y += player.velocidade;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = player.cor;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function loop() {
    update();
    draw();


    requestAnimationFrame(loop);
}

loop();
