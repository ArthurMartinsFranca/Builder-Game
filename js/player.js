let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

const player = {
    x: 100,
    y: 100,
    width: 40,
    height: 40,
    vida: 100,
    velocidade: 4,
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

    if (player.x < 0) {
        player.x = 0;
    }

    if (player.y < 0) {
        player.y = 0;
    }

    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }

    const centroX = player.x + player.width / 2;
    const centroY = player.y + player.height / 2;

    const diferencaX = mouse.x - centroX;
    const diferencaY = mouse.y - centroY;

    player.angulo = Math.atan2(diferencaY, diferencaX);
}

window.addEventListener("mousemove", function(e) {
    const rect = canvas.getBoundingClientRect();
    
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top
})

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    ctx.translate(player.x + player.width / 2,
        player.y + player.height / 2
    );

    ctx.rotate(player.angulo);

    ctx.fillStyle = player.cor;

    ctx.fillRect(
        -player.width / 2,
        -player.height / 2,
        player.width,
        player.height
    );

    ctx.restore()
}

function loop() {
    update();
    draw();


    requestAnimationFrame(loop);
}

loop();

