const GetValue = Phaser.Utils.Objects.GetValue;

class Movement {
    constructor(config) {
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setValue(GetValue(o, 'value', 0));
        this.setSpeed(GetValue(o, 'speed', 0));
        this.setAcceleration(GetValue(o, 'acceleration', 0));
        return this;
    }

    reset() {
        this.setValue(0);
        this.setSpeed(0);
        this.setAcceleration(0);
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    setSpeed(speed) {
        // speed == 0 : stop
        // speed  > 0 : move
        this.speed = speed;
        return this;        
    }

    setAcceleration(acc) {
        // acc == 0 : constant speed
        // acc  > 0 : acceleration
        // acc  < 0 : deceleration
        this.acceleration = acc;
        return this;
    }

    updateSpeed(delta) {
        // delta in sec
        if (this.acceleration !== 0) {
            this.speed += (this.acceleration * delta);
            if (this.speed < 0) {
                this.speed = 0;
            }
        }
        return this;
    }

    getDeltaValue(delta) {
        // delta in sec
        this.updateSpeed(delta);
        if (this.speed <= 0) {
            return 0;
        }
        return (this.speed * delta);
    }

    update(delta) {
        // delta in sec
        this.updateSpeed(delta);
        if (this.speed > 0) {
            this.value += this.getDeltaValue(delta);
        }
        return this;
    }

    get isMoving() {
        return (this.speed > 0);
    }
}
export default Movement;