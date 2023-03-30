export default class Keyboard {
    static DROP_KEY = 'f';

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

    handleKeyDown (e, player) {
        const key = e.key.toLowerCase();
        if (key == Keyboard.DROP_KEY) {
            player.drop();
            return;
        }
        // If the key pressed is not  a valid key, return
        if (!(key in this.keys)) return;
        // Else, set the pressed state to true
        this.keys[key].pressed = true;
        // Push this key to the key stack
        this.keyStack.push(key);
    }

    handleKeyUp (e) {
        const key = e.key.toLowerCase();
        // If the key pressed is not a valid key, return
        if (!(key in this.keys)) return;
        // Else, set the pressed state to false
        this.keys[key].pressed = false;
        // Remove this key from the key stack
        this.keyStack.pop();
    }
}