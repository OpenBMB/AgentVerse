import EaseValueTask from '../../../../utils/ease/EaseValueTask.js';

export default {
    setCheckerAnimationDuration(duration) {
        if (duration === undefined) {
            duration = 0;
        }
        this.checkerAnimDuration = duration;
        return this;
    },

    playCheckerAnimation() {
        if (this.checkerAnimProgressTask === undefined) {
            this.checkerAnimProgressTask = new EaseValueTask(this, { eventEmitter: null });
        }

        this.checkerAnimProgressTask.restart({
            key: 'checkerAnimProgress',
            from: 0,
            to: 1,
            duration: this.checkerAnimDuration,
        });

        return this;
    },

    stopCheckerAnimation() {
        if (this.checkerAnimProgressTask === undefined) {
            return this;
        }

        this.checkerAnimProgressTask.stop();
        return this;
    },

}