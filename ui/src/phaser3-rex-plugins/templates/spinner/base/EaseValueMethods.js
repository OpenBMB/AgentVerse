import EaseValueTask from '../../../plugins/utils/ease/EaseValueTask.js';

var Start = function (duration) {
    if (!this.easeValueTask) {
        this.easeValueTask = new EaseValueTask(this, { eventEmitter: null });
    }

    if (duration !== undefined) {
        this.duration = duration;
        this.easeValueTask.stop();  // Will restart with new duration
    }

    // Won't restart if easeValueTask is running
    if (this.easeValueTask.isRunning) {
        return this;
    }

    // Start easeValueTask
    this.easeValueTask.restart({
        key: 'value',
        from: 0, to: 1,
        duration: this.duration,
        ease: this.ease,
        repeat: -1,  // -1: infinity

        delay: this.delay,
        repeatDelay: this.repeatDelay
    });

    this.setDirty();

    return this;
}

var Stop = function () {
    if (!this.easeValueTask) {
        return this;
    }
    this.easeValueTask.stop();
    this.setDirty();
    return this;
}

var Pause = function () {
    if (!this.easeValueTask) {
        return this;
    }
    this.easeValueTask.pause();
    this.setDirty();
    return this;
}

var Resume = function () {
    if (!this.easeValueTask) {
        return this;
    }
    this.easeValueTask.pause();
    this.setDirty();
    return this;
}

export default {
    start: Start,
    stop: Stop,
    pause: Pause,
    resume: Resume
}