export default class Keyboard {

    constructor (props) {
        this.keys = {
            w: { pressed: false },
            a: { pressed: false },
            s: { pressed: false },
            d: { pressed: false },
        }
        this.keyStack = [];
    }

    get lastKey() { return this.keyStack[this.keyStack.length - 1] }

    handleKeyDown (e) {
        if (!(e.key in this.keys)) return;
        this.keys[e.key].pressed = true;
        this.keyStack.push(e.key);
    }

    handleKeyUp (e) {
        if (!(e.key in this.keys)) return;
        this.keys[e.key].pressed = false;
        this.keyStack.splice(this.keyStack.indexOf(e.key), 1);
    }
}