export default {
    // Override
    runTransitionOutCallback() {
        this.transitOutCallback(this.parent, this.transitOutTime);
        return this.transitOutTime;
    },

    // Override
    onClose() {
        // Destroy parent and this behavior
        if (this.oneShotMode) {
            this.parent.destroy();
            // Will invoke `this.destroy()`
        }
    },

    requestClose(closeEventData, duration) {
        if (!this._state.canClose) {
            return this;
        }

        this.closeEventData = (arguments.length > 0) ? closeEventData : this.parent;

        var transitionTimeSave = this.transitOutTime;
        if (duration !== undefined) {
            this.transitOutTime = duration;
        }

        this._state.goto('TRANS_CLOSE');

        this.transitOutTime = transitionTimeSave;

        return this;
    },
}