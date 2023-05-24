import TwoPointersTracer from '../twopointerstracer/TwoPointersTracer.js';
import FSM from '../../../fsm.js';
import SpinObject from './SpinObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const WrapDegrees = Phaser.Math.Angle.WrapDegrees; // Wrap degrees: -180 to 180 
const ShortestBetween = Phaser.Math.Angle.ShortestBetween;
const RadToDeg = Phaser.Math.RadToDeg;
const DegToRad = Phaser.Math.DegToRad;

class Rotate extends TwoPointersTracer {
    constructor(scene, config) {
        super(scene, config);

        var self = this;
        var stateConfig = {
            states: {
                IDLE: {
                    enter: function () {
                        self.prevAngle = undefined;
                        self.angle = 0;
                    },
                },
                BEGIN: {
                },
                RECOGNIZED: {
                    enter: function () {
                        self.emit('rotatestart', self);
                    },
                    exit: function () {
                        self.emit('rotateend', self);
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
        this.prevAngle = WrapDegrees(RadToDeg(this.angleBetween)); // Degrees
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
                    var curAngle = WrapDegrees(RadToDeg(this.angleBetween));
                    this.angle = ShortestBetween(this.prevAngle, curAngle);
                    this.prevAngle = curAngle;
                    this.state = RECOGNIZED;
                }
                break;
            case RECOGNIZED:
                var curAngle = WrapDegrees(RadToDeg(this.angleBetween));
                this.angle = ShortestBetween(this.prevAngle, curAngle);
                this.prevAngle = curAngle;
                this.emit('rotate', this);
                break;
        }
    }

    get isRotated() {
        return (this.state === RECOGNIZED);
    }

    get rotation() {
        return DegToRad(this.angle);
    }

    setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
    }

}

var methods = {
    spinObject: SpinObject,
};
Object.assign(
    Rotate.prototype,
    methods
);


const IDLE = 'IDLE';
const BEGIN = 'BEGIN';
const RECOGNIZED = 'RECOGNIZED';

export default Rotate;