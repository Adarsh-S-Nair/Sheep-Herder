export default class Sprite {
    
    constructor (props) {
        this.image = props.image;
        this.position = props.position;
        this.frames = props.frames ? props.frames : 1;
        this.directions = props.directions ? props.directions : 1;
        this.margins = props.margins ? props.margins : { top: 0, bottom: 0, left: 0, right: 0};
        this.width = (this.image.width / this.frames) - this.margins.right;
        this.height = (this.image.height / this.directions) - this.margins.bottom;
        this.speed = props.speed ? props.speed : 0;
        this.c = props.c
    }

    get top()       { return this.position.y }
    get bottom()    { return this.position.y + this.height }
    get left()      { return this.position.x }
    get right()     { return this.position.x + this.width } 

    draw () {
        this.c.drawImage(
            this.image, 
            this.margins.left,
            this.margins.top,
            this.width,
            this.height,
            this.position.x, 
            this.position.y,
            this.width,
            this.height
        );
    }

    isColliding (other) {
        return (this.right >= other.left && this.left <= other.right &&
                this.bottom >= other.top && this.top <= other.bottom)
    }
}