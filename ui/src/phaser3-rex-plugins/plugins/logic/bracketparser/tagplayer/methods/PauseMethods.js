export default {
    pause() {
        this.parser.pause();
        return this;
    },

    pauseUntilEvent(eventEmitter, eventName) {
        this.parser.pauseUntilEvent(eventEmitter, eventName);
        return this;
    }
};