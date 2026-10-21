import { MAPA, TAMANHObLOCO } from "./mapa.js";

export const camera = {
    x: 0,
    y: 0
};

export function atualizarCamera(player, canvas) {
    const larguraMapa = MAPA[0].length * TAMANHObLOCO;
    const alturaMapa = MAPA.length * TAMANHObLOCO;

    camera.x = player.x + player.width / 2 - canvas.width / 2;
    camera.y = player.y + player.height / 2 - canvas.height / 2;

    camera.x = Math.max(0, Math.min(camera.x, larguraMapa - canvas.width));
    camera.y = Math.max(0, Math.min(camera.y, alturaMapa - canvas.height));
}

