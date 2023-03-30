export default class Boundary {
    static token = 9154;
    static width = 48;
    static height = 48;

    constructor (props) {
        this.position = props.position;
        this.width = Boundary.width;
        this.height = Boundary.height;
        this.c = props.c;
    }

    get top()       { return this.position.y }
    get bottom()    { return this.position.y + this.height }
    get left()      { return this.position.x }
    get right()     { return this.position.x + this.width } 

    draw () {
        this.c.fillStyle = 'red';
        this.c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}