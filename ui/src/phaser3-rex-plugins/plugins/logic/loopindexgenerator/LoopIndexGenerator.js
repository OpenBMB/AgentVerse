import LoopIndex from './LoopIndex.js';

class LoopIndexGenerator {
    constructor() {
        this.indexes = [];
        this.length = 0;
        this.reset();
    }

    reset() {
        for (var i = 0, cnt = this.indexes.length; i < cnt; i++) {
            this.indexes[i].reset();
        }
        this.firstPass = true;
        this.currentCount = 0;
        return this;
    }

    addNumberLoop(key, start, end, step) {
        if (step === undefined) {
            step = (end >= start) ? 1 : -1;
        }
        this.indexes.push(new LoopIndex(key, start, end, step));
        this.length = this._getLength();
        return this;
    }

    addItemsLoop(key, items, reverse) {
        if (reverse === undefined) {
            reverse = false;
        }
        var lastIndex = items.length - 1;
        var start = (reverse) ? lastIndex : 0;
        var end = (reverse) ? 0 : lastIndex;
        var step = (reverse) ? -1 : 1;
        this.indexes.push(new LoopIndex(key, start, end, step, items));
        this.length = this._getLength();
        return this;
    }

    addLoop(config) {
        this.indexes.push(new LoopIndex(config.key, config.start, config.end, config.step, config.items));
        this.length = this._getLength();
        return this;
    }

    removeLoops() {
        this.indexes.length = 0;
        this.length = 0;
        return this;
    }

    _getLength() {
        var total = undefined;
        for (var i = 0, cnt = this.indexes.length; i < cnt; i++) {
            if (total === undefined) {
                total = this.indexes[i].length;
            } else {
                total *= this.indexes[i].length;
            }
        }
        return (total === undefined) ? 0 : total;
    }

    get progress() {
        return this.currentCount / this.length;
    }

    get isEnd() {
        for (var i = this.indexes.length - 1; i >= 0; i--) {
            if (!this.indexes[i].isEnd) {
                return false;
            }
        }
        return true;
    }

    next() {
        var loopIndex, goNext;
        for (var i = this.indexes.length - 1; i >= 0; i--) {
            loopIndex = this.indexes[i];
            goNext = loopIndex.isEnd;
            loopIndex.next();
            if (!goNext) {
                break;
            }
        }        
        return this;
    }

    getCurrent(out) {
        if (out === undefined) {
            out = {};
        }
        var loopIndex;
        for (var i = this.indexes.length - 1; i >= 0; i--) {
            loopIndex = this.indexes[i];
            out[loopIndex.key] = loopIndex.current;
        }
        return out;
    }

    getNext(out) {
        if (!this.firstPass) {
            this.next();
        } else {
            this.firstPass = false;
        }
        this.getCurrent(out);
        this.currentCount++;
        return out;
    }
}
export default LoopIndexGenerator;