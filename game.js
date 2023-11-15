const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    color: 'blue',
    velocityY: 0,
    gravity: 0.5,
    jumping: false
};

const keys = {
    right: false,
    left: false,
    up: false
};

function update() {
    // Päivitä pelaajan sijainti
    if (keys.right) player.x += 5;
    if (keys.left) player.x -= 5;

    // Hyppääminen ja painovoima
    if (keys.up && !player.jumping) {
        player.jumping = true;
        player.velocityY = -10;
    }

    player.y += player.velocityY;
    player.velocityY += player.gravity;

    // Tarkista, onko pelaaja maassa
    if (player.y > canvas.height - player.height) {
        player.jumping = false;
        player.y = canvas.height - player.height;
        player.velocityY = 0;
    }

    // Piirrä peli
    draw();

    // Pyydä uusi animaatiokehys
    requestAnimationFrame(update);
}

function draw() {
    // Tyhjennä canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Piirrä pelaaja
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Kuuntele näppäimistötapahtumia
window.addEventListener('keydown', function(e) {
    if (e.code === 'ArrowRight') keys.right = true;
    if (e.code === 'ArrowLeft') keys.left = true;
    if (e.code === 'ArrowUp') keys.up = true;
});

window.addEventListener('keyup', function(e) {
    if (e.code === 'ArrowRight') keys.right = false;
    if (e.code === 'ArrowLeft') keys.left = false;
    if (e.code === 'ArrowUp') keys.up = false;
});

// Aloita pelin päivityssilmukka
update();
