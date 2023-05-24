class Stack {
    constructor() {
        this.items = [];
    }

    destroy() {
        this.clear();
        this.items = undefined;
    }

    pop() {
        return (this.items.length > 0) ? this.items.pop() : null;
    }

    push(l) {
        this.items.push(l);
        return this;
    }

    pushMultiple(arr) {
        this.items.push.apply(this.items, arr);
        arr.length = 0;
        return this;
    }

    clear() {
        this.items.length = 0;
        return this;
    }
}

export default Stack;