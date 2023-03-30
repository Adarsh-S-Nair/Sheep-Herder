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

const penWidth = 1200;
const penHeight = 530;
const pen = new Sprite({
    position: { x: (canvas.width / 2) - (penWidth / 2) + 10, y: (canvas.height / 2) - (penHeight / 2) + 100},
    width: penWidth,
    height: penHeight,
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

const sheep = new Sprite({
    position: { x: player.position.x + 250, y: player.position.y + 600 },
    image: '../../images/sheep.png',
    frames: 4,
    directions: 5,
    margins: { top: 12, bottom: 12, left: 4, right: 4},
    speed: player.speed / 2,
    pen: pen,
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

const movables = [background, foreground, pen, sheep, ...boundaries];

function handleBarrierCollision (key, distance) {
    // Iterate through boundaries
    for (let i = 0; i < boundaries.length; i++) {
        // Get a deep copy of the boundary object
        const b = JSON.parse(JSON.stringify(boundaries[i]));
        // Get the position of the boundary if the player moves in this direction
        b.position[key.axis] += distance * -1;
        // Turn this copy into a boundary object
        const boundary = new Boundary({ position: { x: b.position.x, y: b.position.y }, c})
        // Determine if the player collides with this boundary
        if (player.isColliding(boundary)) {
            // If it is colliding with a barrier, prevent the player from moving
            player.stopMoving();
            // No need to check other barriers... break out of the loop
            break;
        }
    }
}

function handleSheepCollision (key, distance) {
    if (sheep.isInPen && !sheep.carriedBy) {
        sheep.stopMoving();
        return;
    };

    if (player.detectionRadius.isColliding(sheep.detectionRadius)) {
        sheep.moving = true;
        sheep.direction = key.facing;
        sheep.position[key.axis] += distance;

        if (player.carrying) return;

        if (player.isColliding(sheep)) {
            player.carry(sheep);
        }
    }
    else {
        sheep.stopMoving();
    }
}

function handleMovement () {
    player.moving = false;
    // Iterate through all movement keys
    for (const k in keyboard.keys) {
        // Get reference to the current key object
        const key = keyboard.keys[k];
        // If the key is not pressed or the last key is not this one, go next
        if (!key.pressed || keyboard.lastKey != k) continue;
        // Else if it is, set player moving to true
        player.moving = true;
        // Get the distance to change the position by
        const distance = player.speed * key.direction;
        // Handle collision with barriers
        handleBarrierCollision(key, distance);
        // If the player is not moving, go next...
        if (!player.moving) continue;
        // Handle collision with sheep
        handleSheepCollision(key, sheep.speed * key.direction);
        // Set the direction the player is facing
        player.direction = key.facing;
        // Move all the movable objects on opposite direction of player
        movables.forEach(m => { m.position[key.axis] += distance * -1 })
    }

    if (!player.moving) {
        player.stopMoving();
    }
}

function animate() {
    window.requestAnimationFrame(animate);

    // Draw the background
    background.draw();
    // Draw the player
    player.draw();
    // Draw the sheep
    sheep.draw();
    // Draw the foreground
    foreground.draw();
    // Check for movement
    handleMovement();
}

window.addEventListener('keydown', (e) => { keyboard.handleKeyDown(e, player) })
window.addEventListener('keyup', (e) => { keyboard.handleKeyUp(e) })

animate();