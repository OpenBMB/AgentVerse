import OnePointerTracer from "../onepointertracer/OnePointerTracer.js";
import FSM from '../../../fsm.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const DistanceBetween = Phaser.Math.Distance.Between;

class Tap extends OnePointerTracer {
    constructor(gameObject, config) {
        super(gameObject, config);

        var self = this;
        var stateConfig = {
            states: {
                IDLE: {
                    enter: function () {
                        self.stop();
                        self.tapsCount = 0;
                        self.x = 0;
                        self.y = 0;
                        self.worldX = 0;
                        self.worldY = 0;
                    },
                    exit: function () {
                        var pointer = self.lastPointer;
                        self.x = pointer.x;
                        self.y = pointer.y;
                        self.worldX = pointer.worldX;
                        self.worldY = pointer.worldY;
                    }
                },
                BEGIN: {
                    enter: function () {
                        self.start();
                        self.tapsCount = 0;
                        self.emit('tappingstart', self, self.gameObject, self.lastPointer);
                    },
                },
                RECOGNIZED: {
                    enter: function () {
                        self.start();
                        self.emit('tap', self, self.gameObject, self.lastPointer);
                        self.emit(`${self.tapsCount}tap`, self, self.gameObject, self.lastPointer);
                    },
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
        this.setHoldTime(GetValue(o, 'time', 250)); // min-hold-time of Press is 251
        this.setTapInterval(GetValue(o, 'tapInterval', 200));
        this.setDragThreshold(GetValue(o, 'threshold', 9));
        this.setTapOffset(GetValue(o, 'tapOffset', 10));

        var taps = GetValue(o, 'taps', undefined);
        if (taps !== undefined) {
            this.setTaps(taps);
        } else {
            this.setMaxTaps(GetValue(o, 'maxTaps', undefined));
            this.setMinTaps(GetValue(o, 'minTaps', undefined));
        }
        return this;
    }

    onDragStart() {
        switch (this.state) {
            case IDLE:
                this.state = BEGIN;
                break;

            case BEGIN:
                var pointer = this.lastPointer;
                var tapsOffset = DistanceBetween(
                    pointer.upX,
                    pointer.upY,
                    pointer.x,
                    pointer.y);
                if (tapsOffset > this.tapOffset) { // Can't recognize next level, restart here
                    this.state = RECOGNIZED;
                    this.state = BEGIN;
                }
                break;

            case RECOGNIZED:
                this.state = BEGIN;
                break;
        }
    }

    onDragEnd() {
        if (this.state === BEGIN) {
            this.tapsCount++; // Try recognize next level
            this.emit('tapping', this, this.gameObject, this.lastPointer);

            if ((this.maxTaps !== undefined) && (this.tapsCount === this.maxTaps)) { // Reach to maxTaps, stop here                
                this.state = RECOGNIZED;
            }
        }
    }

    onDrag() {
        if (this.state === IDLE) {
            return;
        }

        if (this.pointer.getDistance() > this.dragThreshold) { // Cancel
            this.state = IDLE;
        }
    }

    preUpdate(time, delta) {
        if ((!this.isRunning) || (!this.enable)) {
            return;
        }
        if (this.state === BEGIN) {
            var pointer = this.lastPointer;
            if (pointer.isDown) {
                var holdTime = time - pointer.downTime;
                if (holdTime > this.holdTime) {
                    this.state = IDLE;
                }
            } else { // isUp
                var releasedTime = time - pointer.upTime;
                if (releasedTime > this.tapInterval) {
                    if ((this.minTaps === undefined) || (this.tapsCount >= this.minTaps)) {
                        this.state = RECOGNIZED;
                    } else {
                        this.state = IDLE;
                    }
                }
            }
        }
    }

    postUpdate(time, delta) {
        if ((!this.isRunning) || (!this.enable)) {
            return;
        }
        // Clear RECOGNIZED after update()
        if (this.state === RECOGNIZED) {
            this.state = IDLE;
        }
    }

    get isTapped() {
        return (this.state === RECOGNIZED);
    }

    setHoldTime(time) {
        this.holdTime = time; // ms
        return this;
    }

    setTapInterval(time) {
        this.tapInterval = time; // ms
        return this;
    }

    setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
    }

    setTapOffset(distance) {
        this.tapOffset = distance;
        return this;
    }

    setMaxTaps(taps) {
        this.maxTaps = taps;
        return this;
    }

    setMinTaps(taps) {
        this.minTaps = taps;
        return this;
    }

    setTaps(minTaps, maxTaps) {
        if (maxTaps === undefined) {
            maxTaps = minTaps;
        }
        this.setMinTaps(minTaps).setMaxTaps(maxTaps);
        return this;
    }
}

const IDLE = 'IDLE';
const BEGIN = 'BEGIN';
const RECOGNIZED = 'RECOGNIZED';

export default Tap;