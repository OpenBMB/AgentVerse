import TwoPointersTracer from '../twopointerstracer/TwoPointersTracer.js';
import FSM from '../../../fsm.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Pinch extends TwoPointersTracer {
    constructor(scene, config) {
        super(scene, config);

        var self = this;
        var stateConfig = {
            states: {
                IDLE: {
                    enter: function () {
                        self.prevDistance = undefined;
                        self.scaleFactor = 1;
                    },
                },
                BEGIN: {
                },
                RECOGNIZED: {
                    enter: function () {
                        self.emit('pinchstart', self);
                    },
                    exit: function () {
                        self.emit('pinchend', self);
                    }
                }
            },
            init: function () {
                this.state = IDLE;
            },
            eventEmitter: false,
        }
        this.setRecongizedStateObject(new FSM(stateConfig));
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.setDragThreshold(GetValue(o, 'threshold', 0));
        return this;
    }

    onDrag2Start() {
        this.scaleFactor = 1;
        this.prevDistance = this.distanceBetween;
        this.state = BEGIN;
        if (this.dragThreshold === 0) {
            this.state = RECOGNIZED;
        }
    }

    onDrag2End() {
        this.state = IDLE;
    }

    onDrag2() {
        switch (this.state) {
            case BEGIN:
                if ((this.pointers[0].getDistance() >= this.dragThreshold) &&
                    (this.pointers[1].getDistance() >= this.dragThreshold)) {
                    var curDistance = this.distanceBetween;
                    this.scaleFactor = curDistance / this.prevDistance;
                    this.prevDistance = curDistance;
                    this.state = RECOGNIZED;
                }
                break;
            case RECOGNIZED:
                var curDistance = this.distanceBetween;
                this.scaleFactor = curDistance / this.prevDistance;
                this.emit('pinch', this);
                this.prevDistance = curDistance;
                break;
        }
    }

    get isPinched() {
        return (this.state === RECOGNIZED);
    }

    setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
    }
}

const IDLE = 'IDLE';
const BEGIN = 'BEGIN';
const RECOGNIZED = 'RECOGNIZED';

export default Pinch;