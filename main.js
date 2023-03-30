import Keyboard             from "./classes/Keyboard.js";
import Sprite               from "./classes/Sprite.js";
import Boundary             from "./classes/Boundary.js";
import boundariesMap        from "./data/boundaries.js";

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

const keyboard = new Keyboard();

const startingOffset = { x: -1160, y: -675 }

const background = new Sprite({
    position: { x: startingOffset.x, y: startingOffset.y },
    image: '../../images/Barn.png',
    c: c
})

const foreground = new Sprite({
    position: { x: startingOffset.x, y: startingOffset.y },
    image: '../../images/foreground.png',
    c: c
})

const player = new Sprite({
    position: { x: canvas.width / 2, y: canvas.height / 2},
    image: '../../images/player.png',
    frames: 4,
    directions: 5,
    margins: { top: 16, bottom: 16, left: 4, right: 12},
    speed: 6,
    c: c
})

const boundariesMatrix = [];
for (let i = 0; i < boundariesMap.length; i += 70) {
    const row = boundariesMap.slice(i, 70 + i);
    boundariesMatrix.push(row);
}


const boundaries = [];
boundariesMatrix.forEach((row, i) => {
    row.forEach((token, j) => {
        // Ensure that the token is the boundary token
        if (token != Boundary.token) return;
        // If it is, get the position of this boundary
        const x = j * Boundary.width + startingOffset.x;
        const y = i * Boundary.height + startingOffset.y;
        // Create a new boundary object at this position
        const b = new Boundary({ position: { x: x, y: y }, c: c })
        // Push this boundary into the boundaries array
        boundaries.push(b);
    })
})

const movables = [background, foreground, ...boundaries];

function animate() {
    window.requestAnimationFrame(animate);

    // Draw the background
    background.draw();

    // Draw the player
    player.draw();

    // Draw the foreground
    foreground.draw();

    // Check for movement
    player.moving = true;
    if (keyboard.keys.w.pressed && keyboard.lastKey == 'w') {
        for (let i = 0; i < boundaries.length; i++) {
            const b = boundaries[i];
            const copy = new Boundary({ position: { x: b.position.x, y: b.position.y + player.speed }, c: c});
            if (player.isColliding(copy)) {
                player.stopMoving();
                break;
            }
        }
        if (player.moving) {
            player.direction = 1;
            movables.forEach(m => {m.position.y += player.speed})
        }
    }
    else if (keyboard.keys.a.pressed && keyboard.lastKey == 'a') {
        for (let i = 0; i < boundaries.length; i++) {
            const b = boundaries[i];
            const copy = new Boundary({ position: { x: b.position.x + player.speed, y: b.position.y }, c: c});
            if (player.isColliding(copy)) {
                player.stopMoving();
                break;
            }
        }
        if (player.moving) {
            player.direction = 3;
            movables.forEach(m => {m.position.x += player.speed})
        }
    }
    else if (keyboard.keys.s.pressed && keyboard.lastKey == 's') {
        for (let i = 0; i < boundaries.length; i++) {
            const b = boundaries[i];
            const copy = new Boundary({ position: { x: b.position.x, y: b.position.y - player.speed }, c: c});
            if (player.isColliding(copy)) {
                player.stopMoving();
                break;
            }
        }
        if (player.moving) {
            player.direction = 0;
            movables.forEach(m => {m.position.y -= player.speed})
        }
    }
    else if (keyboard.keys.d.pressed && keyboard.lastKey == 'd') {
        for (let i = 0; i < boundaries.length; i++) {
            const b = boundaries[i];
            const copy = new Boundary({ position: { x: b.position.x - player.speed, y: b.position.y }, c: c});
            if (player.isColliding(copy)) {
                player.stopMoving();
                break;
            }
        }
        if (player.moving) {
            player.direction = 2;
            movables.forEach(m => {m.position.x -= player.speed})
        }
    }
    else {
        player.stopMoving();
    }
}

window.addEventListener('keydown', (e) => { keyboard.handleKeyDown(e) })
window.addEventListener('keyup', (e) => { keyboard.handleKeyUp(e) })

animate();