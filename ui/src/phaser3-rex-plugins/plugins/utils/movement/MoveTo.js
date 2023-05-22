import Movement from './Movement.js';

class MoveTo {
    constructor() {
        this.start;
        this.end;
        this.value;
        this.movement = new Movement();
    }

    init(start, end, speed) {
        this.start = start;
        this.end = end;
        this.value = start;
        this.movement
            .setSpeed(speed)
            .setAcceleration(0);
        return this;
    }

    stop() {
        this.movement.reset();
    }

    update(delta) {
        // delta in sec
        var d = this.movement.getDeltaValue(delta);
        if (this.start < this.end) {
            this.value += d;
            if (this.value >= this.end) {
                this.value = this.end;
            }
        } else {
            this.value -= d;
            if (this.value <= this.end) {
                this.value = this.end;
            }
        }
        return this;
    }

    get isMoving() {
        return (this.value !== this.end);
    }
}
export default MoveTo;