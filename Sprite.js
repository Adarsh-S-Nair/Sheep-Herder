export default class Sprite {
    constructor (props) {
        this.image = props.image;
        this.position = props.position;
        this.frames = props.frames ? props.frames : 1;
        this.directions = props.directions ? props.directions : 1;
        this.width = this.image.width / this.frames;
        this.height = this.image.height / this.directions
        this.c = props.c
    }

    draw() {
        this.c.drawImage(
            this.image, 
            0,
            0,
            this.width,
            this.height,
            this.position.x, 
            this.position.y,
            this.width,
            this.height
        );
    }
}