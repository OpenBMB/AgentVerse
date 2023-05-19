export default {
    waitEvent(eventEmitter, eventName) {
        if (eventName === undefined) {
            eventName = 'complete';
        }
        this.waitEvents.waitEvent(eventEmitter, eventName);
        return this;
    },

    isWaitingEvent() {
        return !this.waitEvents.noWaitEvent;
    },
}