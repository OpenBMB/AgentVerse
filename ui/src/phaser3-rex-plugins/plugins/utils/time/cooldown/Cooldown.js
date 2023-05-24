import FSM from '../../../logic/fsm/FSM.js';
class Cooldown extends FSM {
    constructor() {
        super({
            eventEmitter: false
        })

        this.goto('IDLE');
    }

    setCooldownTime(time) {
        this.cooldownTime = time;
        this.cooldownMode = (time !== undefined);
        return this;
    }

    request() {
        return this.runMethod('request');
    }

    // IDLE state
    update_IDLE() {
        this.compensationTime = 0;
    }
    request_IDLE() {
        this.next();
        return true;
    }
    next_IDLE() {
        if (this.cooldownMode) {
            return 'COOLDOWN';
        }
    }

    // COOLDOWN state
    enter_COOLDOWN() {
        this.remainderTime = this.cooldownTime + this.compensationTime;
    }
    update_COOLDOWN(time, delta) {
        this.remainderTime -= delta;
        if (this.remainderTime < 0) {
            this.compensationTime = (this.cooldownTime > delta) ? (-this.remainderTime) : 0;
            this.goto('IDLE');
        }
    }
    request_COOLDOWN() {
        return false;
    }

}

export default Cooldown;