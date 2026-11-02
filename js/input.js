export const mouse = {
    x: 0,
    y: 0
}

export const teclas = {
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
