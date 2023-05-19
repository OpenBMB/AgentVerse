const SetStruct = Phaser.Structs.Set;
class WaitEvents {
    constructor(completeCallback, scope) {
        this.setCompleteCallback(completeCallback, scope);
        this.events = new SetStruct();
    }

    shutdown() {
        this.setCompleteCallback(undefined, undefined);
        this.events.clear();
        this.event = undefined;
        return this;
    }

    destroy() {
        this.shutdown();
        return this;
    }

    setCompleteCallback(callback, scope) {
        this.completeCallback = callback;
        this.scope = scope;
        return this;
    }

    waitCallback() {
        var self = this;
        var callback = function () {
            self.remove(callback);
        }
        this.events.set(callback);
        return callback;
    }

    waitEvent(eventEmitter, eventName) {
        eventEmitter.once(eventName, this.waitCallback());
        return this;
    }

    remove(callback) {
        this.events.delete(callback);
        if (this.noWaitEvent) {
            if (this.scope) {
                this.completeCallback.call(this.scope);
            } else {
                this.completeCallback();
            }
        }
        return this;
    }

    clear() {
        this.events.clear();
        return this;
    }

    get noWaitEvent() {
        return this.events.size === 0;
    }
}

export default WaitEvents;