export default class Keyboard {

    constructor (props) {
        // Instantiate all the movement keys
        this.keys = {
            w: { axis: 'y', direction: -1, facing: 1 },
            a: { axis: 'x', direction: -1, facing: 3 },
            s: { axis: 'y', direction:  1, facing: 0 },
            d: { axis: 'x', direction:  1, facing: 2 }
        }
        // Instantiate a key stack array
        this.keyStack = [];
    }

    // Return the last key in the key stack array
    get lastKey() { return this.keyStack[this.keyStack.length - 1] }

    handleKeyDown (e) {
        // If the key pressed is not  a valid key, return
        if (!(e.key in this.keys)) return;
        // Else, set the pressed state to true
        this.keys[e.key].pressed = true;
        // Push this key to the key stack
        this.keyStack.push(e.key);
    }

    handleKeyUp (e) {
        // If the key pressed is not a valid key, return
        if (!(e.key in this.keys)) return;
        // Else, set the pressed state to false
        this.keys[e.key].pressed = false;
        // Remove this key from the key stack
        this.keyStack.pop();
    }
}