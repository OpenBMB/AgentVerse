import PostStepDelayCall from '../../../utils/time/PostStepDelayCall.js';

export default {
    delayCall(delay, callback, scope) {
        // Invoke callback under scene's 'postupdate' event
        this.delayCallTimer = PostStepDelayCall(this, delay, callback, scope);
        return this;
    },

    removeDelayCall() {
        if (this.delayCallTimer) {
            this.delayCallTimer.remove(false);
            this.delayCallTimer = undefined;
        }
        return this;
    }

}