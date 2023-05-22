import Movement from './Movement.js';

class SlowDown {
    constructor() {
        this.value;
        this.dir; // true:+, false:-
        this.movement = new Movement();
    }

    init(start, dir, speed, dec, end) {
        this.value = start;
        this.end = end;
        if (end !== undefined) {
            this.dir = (start < end);
        } else {
            this.dir = dir;
        }

        this.movement
            .setSpeed(speed)
            .setAcceleration(-dec);
        return this;
    }

    stop() {
        this.movement.reset();
    }

    update(delta) {
        // delta in sec
        var d = this.movement.getDeltaValue(delta);
        if (!this.dir) {
            d = -d;
        }

        if (this.end === undefined) {
            this.value += d;
        } else {
            if (d === 0) {
                this.value = this.end;
            } else {
                this.value += d;
                if (this.dir) { // +
                    if (this.value > this.end) {
                        this.value = this.end;
                    }
                } else { // -
                    if (this.value < this.end) {
                        this.value = this.end;
                    }
                }
            }
        }
        return this;
    }

    get isMoving() {
        return this.movement.isMoving;
    }
}
export default SlowDown;