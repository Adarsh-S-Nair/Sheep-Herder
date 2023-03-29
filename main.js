import Keyboard from "./Keyboard.js";
import Sprite from "./Sprite.js";

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

const keyboard = new Keyboard();

const backgroundImage = new Image();
backgroundImage.src = './images/Barn.png'

const playerImage = new Image()
playerImage.src = './images/player.png';

const background = new Sprite({
    position: { x: -1175, y: -650 },
    image: backgroundImage,
    c: c
})

const player = new Sprite({
    position: { x: canvas.width / 2, y: canvas.height / 2},
    image: playerImage,
    frames: 4,
    directions: 5,
    c: c
})

function animate() {
    window.requestAnimationFrame(animate);

    // Draw the background
    background.draw();

    // Draw the player
    player.draw();

    // Check for movement
    if (keyboard.keys.w.pressed && keyboard.lastKey == 'w') {
        background.position.y += 3;
    }
    else if (keyboard.keys.a.pressed && keyboard.lastKey == 'a') {
        background.position.x += 3;
    }
    else if (keyboard.keys.s.pressed && keyboard.lastKey == 's') {
        background.position.y -= 3;
    }
    else if (keyboard.keys.d.pressed && keyboard.lastKey == 'd') {
        background.position.x -= 3;
    }
}

window.addEventListener('keydown', (e) => { keyboard.handleKeyDown(e) })
window.addEventListener('keyup', (e) => { keyboard.handleKeyUp(e) })

animate();