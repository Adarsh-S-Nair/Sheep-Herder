export default class Sprite {
    
    constructor (props) {
        this.image = new Image();

        this.image.src = props.image;
        this.position = props.position;
        this.frame = 0;
        this.frames = props.frames ? props.frames : 1;
        this.elapsedFrames = 0;
        this.directions = props.directions ? props.directions : 1;
        this.margins = props.margins ? props.margins : { top: 0, bottom: 0, left: 0, right: 0};
        this.width = (this.image.width / this.frames) - this.margins.right;
        this.height = (this.image.height / this.directions) - this.margins.bottom;
        this.speed = props.speed ? props.speed : 0;
        this.moving = false;
        this.direction = 0;
        this.c = props.c;
        this.detectionRadius = new DetectionRadius(this, this.c);
    }

    get top()       { return this.position.y }
    get bottom()    { return this.position.y + this.height }
    get left()      { return this.position.x }
    get right()     { return this.position.x + this.width } 

    draw () {
        this.c.drawImage(
            this.image, 
            (this.frame * (this.image.width / this.frames)) + this.margins.left,
            (this.direction * (this.image.height / this.directions)) + this.margins.top,
            this.width,
            this.height,
            this.position.x, 
            this.position.y,
            this.width,
            this.height
        );

        // this.detectionRadius.draw();

        if (!this.moving) return;

        if (this.frames > 1) this.elapsedFrames++;

        if (this.elapsedFrames % 10 == 0) {
            this.frame < this.frames - 1 ? this.frame++ : this.frame = 0;
        }
    }

    stopMoving () {
        this.moving = false;
        this.frame = 0;
    }

    isColliding (other) {
        return (this.right >= other.left && this.left <= other.right &&
                this.bottom >= other.top && this.top <= other.bottom)
    }
}

class DetectionRadius {

    constructor (sprite, c) {
        this.sprite = sprite;
        this.radius = 2 * this.sprite.width;
        this.c = c;
    }

    get top()       { return this.sprite.position.y - this.radius + this.sprite.height / 2 }
    get bottom()    { return this.top + this.radius * 2 }
    get left()      { return this.sprite.position.x - this.radius + this.sprite.width / 2 }
    get right()     { return this.left + this.radius * 2 } 

    draw () {
        this.c.strokeRect(
            this.left,
            this.top,
            this.radius * 2,
            this.radius * 2
        )
    }

    isColliding (other) {
        return (this.right >= other.left && this.left <= other.right &&
                this.bottom >= other.top && this.top <= other.bottom)
    }
}