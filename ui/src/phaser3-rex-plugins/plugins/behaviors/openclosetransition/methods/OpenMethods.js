export default {
    // Override
    runTransitionInCallback() {
        this.transitInCallback(this.parent, this.transitInTime);
        return this.transitInTime;
    },

    // Override
    onOpen() {
    },

    requestOpen(openEventData, duration) {
        if (!this._state.canOpen()) {
            return this;
        }

        this.openEventData = (arguments.length > 0) ? openEventData : this.parent;

        var transitionTimeSave = this.transitInTime;
        if (duration !== undefined) {
            this.transitInTime = duration;
        }

        this._state.goto('TRANS_OPNE');

        this.transitInTime = transitionTimeSave;

        return this;
    },
}