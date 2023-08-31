import Clone from '../../../utils/object/Clone.js';
import Clear from '../../../utils/object/Clear.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class InstMem {
    constructor(scenario) {
        this.scenario = scenario;

        this.queue = [];
        this.currentIdx = -1;
        this.nextIdx = 0;
    }

    resetFromJSON(o) {
        var queue = GetValue(o, 'queue', undefined);
        if (queue === undefined) {
            Clear(this.queue);
        } else {
            Clone(queue, this.queue);
        }

        this.currentIdx = GetValue(o, 'curIdx', -1);
        this.nextIdx = GetValue(o, 'nextIdx', 0);
        return this;
    }

    clear() {
        this.currentIdx = -1;
        this.nextIdx = 0;
        this.queue.length = 0;
        return this;
    }

    append(item) {
        this.queue.push(item);
        return this;
    }

    setNextIndex(index) {
        if (index === undefined) {
            index = this.currentIdx + 1;
        }
        this.nextIdx = index;
        return this;
    }

    get(index) {
        if (index === undefined) {
            index = this.nextIdx;
        }
        this.currentIdx = index;
        return this.queue[index];
    }

    get length() {
        return this.queue.length;
    }
}

export default InstMem;