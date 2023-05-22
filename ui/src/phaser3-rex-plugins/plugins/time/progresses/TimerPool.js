import Pool from '../../pool.js';

class TimerPool extends Pool {
    allocate() {
        return this.pop();
    }

    free(timer) {
        timer.onFree();
        this.push(timer);
    }

    freeMultiple(arr) {
        for (var i = 0, cnt = arr.length; i < cnt; i++) {
            this.free(arr[i]);
        }
        return this;
    }
}

export default TimerPool;