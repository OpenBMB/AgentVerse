import * as Const from '../../model/Const.js';

var AutoPlayIdleMotion = function (motionName) {
    // Not regiester 'idle' event, but also disable auto-play-idle-motion
    if (!this.autoPlayIdleMotionCallback && !motionName) {
        return this;
    }

    // Register 'idle' event one time
    if (!this.autoPlayIdleMotionCallback) {
        this.autoPlayIdleMotionCallback = function () {
            if (!this.idleMotionName) {
                return;
            }
            this.startMotion(this.idleMotionName, undefined, Const.PriorityIdle);
        }
        this.on('idle', this.autoPlayIdleMotionCallback, this);
    }
    this.idleMotionName = motionName;

    return this;
}

export default AutoPlayIdleMotion;