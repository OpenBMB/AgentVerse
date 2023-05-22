import EaseValueTaskBase from '../../../../utils/componentbase/tweentask/EaseValueTaskBase.js';
import FaceNameToIndex from './FaceNameToIndex.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const RadToDeg = Phaser.Math.RadToDeg;
const DegToRad = Phaser.Math.DegToRad;
const WrapDegrees = Phaser.Math.Angle.WrapDegrees;
const ShortestBetween = Phaser.Math.Angle.ShortestBetween;
const Wrap = Phaser.Math.Wrap;
const Linear = Phaser.Math.Linear;

class Roll extends EaseValueTaskBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;
        // this.timer

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.setEase(GetValue(o, 'ease', 'Cubic'));
        return this;
    }

    start(deltaRotation) {
        if (this.timer.isRunning) {
            return this;
        }

        this.timer
            .setDelay(this.delay)
            .setDuration(this.duration);

        var gameObject = this.parent;
        this.startRotationY = gameObject.rotationY;
        this.endRotationY = this.startRotationY + deltaRotation;

        super.start();
        return this;
    }

    to(index, duration) {
        if (this.isRunning) {
            return this;
        }

        var carousel = this.parent;

        if (typeof (index) === 'string') {
            index = FaceNameToIndex(carousel.faces, index);
            if (index === -1) {
                index = 0;
            }
        }
        index = Wrap(index, 0, carousel.faces.length);

        if (duration !== undefined) {
            this.setDuration(duration);
        }

        var start = WrapDegrees(RadToDeg(carousel.rotationY));
        var end = WrapDegrees(RadToDeg(((carousel.rtl) ? 1 : -1) * carousel.faceAngle * index));
        var delta = ShortestBetween(start, end); // Degrees
        this.start(DegToRad(delta));

        carousel.currentFaceIndex = index;
        return this;
    }

    toNext(duration) {
        var index = this.parent.currentFaceIndex + 1;
        this.to(index, duration);
        return this;
    }

    toPrevious(duration) {
        var index = this.parent.currentFaceIndex - 1;
        this.to(index, duration);
        return this;
    }

    toRight(duration) {
        if (!this.parent.rtl) {
            this.toNext(duration);
        } else {
            this.toPrevious(duration);
        }
        return this;
    }

    toLeft(duration) {
        if (!this.parent.rtl) {
            this.toPrevious(duration);
        } else {
            this.toNext(duration);
        }
        return this;
    }

    updateGameObject(gameObject, timer) {
        var t = this.easeFn(timer.t);
        gameObject.rotationY = Linear(this.startRotationY, this.endRotationY, t);
    }
}

export default Roll;