import EaseValueTaskBase from '../../utils/componentbase/tweentask/EaseValueTaskBase.js';
import GetFaceUpdatingCallback from './GetFaceUpdatingCallback.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const Linear = Phaser.Math.Linear;

class Flip extends EaseValueTaskBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;
        // this.timer

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.setDuration(GetAdvancedValue(o, 'duration', 500));
        this.setEase(GetValue(o, 'ease', 'Sine'));

        this.setOrientation(GetValue(o, 'orientation', 0));
        this.setFrontFace(GetValue(o, 'front', undefined));
        this.setBackFace(GetValue(o, 'back', undefined));
        this.setFace(GetValue(o, 'face', 0));
        return this;
    }

    setOrientation(orientation) {
        if (typeof (orientation) === 'string') {
            orientation = ORIENTATIONMODE[orientation];
        }
        this.orientation = orientation;
        return this;
    }

    get face() {
        return this._face;
    }

    set face(face) {
        if (typeof (face) === 'string') {
            face = FACEMODE[face];
        }
        this._face = face;
        if ((face === 0) && this.frontFaceCallback) {
            this.frontFaceCallback(this.parent);
        } else if ((face === 1) && this.backFaceCallback) {
            this.backFaceCallback(this.parent);
        }
    }

    setFace(face) {
        this.face = face;
        return this;
    }

    toggleFace() {
        var newFace = (this.face === 0) ? 1 : 0;
        this.setFace(newFace);
        return this;
    }

    setFrontFace(key, frame) {
        this.frontFaceCallback = GetFaceUpdatingCallback(key, frame, this.parent);
        return this;
    }

    setBackFace(key, frame) {
        this.backFaceCallback = GetFaceUpdatingCallback(key, frame, this.parent);
        return this;
    }

    start() {
        if (this.timer.isRunning) {
            return this;
        }

        var gameObject = this.parent;
        if (this.orientation === 0) {
            this.scale0 = gameObject.scaleX;
        } else {
            this.scale0 = gameObject.scaleY;
        }

        this.timer
            .setDelay(this.delay)
            .setDuration(this.duration / 2)
            .setRepeat(1);  // 2 times

        super.start();
        return this;
    }

    flip(duration) {
        if (this.isRunning) {
            return this;
        }
        if (duration !== undefined) {
            this.setDuration(duration);
        }
        this.start();
        return this;
    }

    updateGameObject(gameObject, timer) {
        if (timer.justRestart) {
            this.toggleFace();
        }

        var t = timer.t;
        if (timer.isOddIteration) {  // Yoyo
            t = 1 - t;
        }
        t = this.easeFn(t);

        var value = Linear(this.scale0, 0, t);
        if (this.orientation === 0) {
            gameObject.scaleX = value;
        } else {
            gameObject.scaleY = value;
        }
    }
}

const ORIENTATIONMODE = {
    x: 0,
    horizontal: 0,
    y: 1,
    vertical: 1,
}

const FACEMODE = {
    front: 0,
    back: 1,
}

export default Flip;