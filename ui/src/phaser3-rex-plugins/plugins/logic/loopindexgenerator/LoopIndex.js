class LoopIndex {
    constructor(key, start, end, step, items) {
        this.key = key;
        this.start = start;
        this.end = end;
        this.step = step;
        this.items = items;
        this._current = start;
    }

    reset() {
        this._current = this.start;
    }

    get isEnd() {
        return (this.step >= 0) ? (this._current >= this.end) : (this._current <= this.end);
    }

    get length() {
        if (((this.step >= 0) && (this.start > this.end)) ||
            ((this.step < 0) && (this.start < this.end))) {
            return 0;
        }
        return Math.floor(this.end - this.start) + 1;
    }

    next() {
        if (this.isEnd) {
            this._current = this.start;
        } else {
            this._current += this.step;
        }
        return this;
    }

    get current() {
        return (!this.items) ? this._current : this.items[this._current];
    }
}

export default LoopIndex;