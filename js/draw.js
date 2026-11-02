export let canvas = document.querySelector("#canvas");
export let ctx = canvas.getContext("2d");

export function draw(player, camera, spritePlayer, desenharMapa) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    ctx.translate(-camera.x, -camera.y);

    desenharMapa(ctx);

    ctx.save();

    ctx.translate(
        player.x + player.width / 2,
        player.y + player.height / 2
    );

    ctx.rotate(player.angulo);

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

export function redimensionarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
