import PostUpdateDelayCall from '../../../../plugins/utils/time/PostUpdateDelayCall.js';

export default {
    delayCall(delay, callback, scope) {
        // Invoke callback under scene's 'postupdate' event
        this.timer = PostUpdateDelayCall(this, delay, callback, scope);
        return this;
    },

    removeDelayCall() {
        if (this.timer) {
            this.timer.remove(false);
            this.timer = undefined;
        }
        return this;
    }
}