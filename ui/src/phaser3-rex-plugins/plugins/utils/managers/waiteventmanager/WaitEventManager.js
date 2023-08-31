import { WaitCompleteEvent, RemoveWaitEvents } from './const.js';
import WaitInputMethods from './WaitInputMethods.js';
import WaitGameObjectMethods from './WaitGameObjectMethods.js';
import WaitCameraMethods from './WaitCameraMethods.js';
import WaitMusicMethods from './WaitMusicMethods.js';
import WaitAny from './WaitAny.js';
import GetValue from '../../object/GetValue.js';
import PreUpdateDelayCall from '../../time/PreUpdateDelayCall.js';

class WaitEventManager {
    constructor(parent, config) {
        this.parent = parent;

        this.waitCompleteEventName = GetValue(config, 'completeEventName', WaitCompleteEvent);
        this.clickEE = GetValue(config, 'clickTarget', this.scene.input);
        this.targetCamera = GetValue(config, 'camera', this.scene.cameras.main);
    }

    destroy() {
        this.removeWaitEvents();
        this.clickEE = undefined;
        this.targetCamer = undefined;
    }

    get scene() {
        return this.parent.managersScene;
    }

    waitEvent(eventEmitter, eventName, completeNextTick) {
        if (completeNextTick === undefined) {
            completeNextTick = true;
        }

        var callback = (completeNextTick) ? this.completeNextTick : this.complete;

        eventEmitter.once(eventName, callback, this);
        this.parent.once(RemoveWaitEvents, function () {
            eventEmitter.off(eventName, callback, this);
        })

        return this.parent;
    }

    removeWaitEvents() {
        this.parent.emit(RemoveWaitEvents);
        return this;
    }

    complete() {
        this.removeWaitEvents();
        this.parent.emit(this.waitCompleteEventName);
        return this;
    }

    completeNextTick() {
        // Emit complete event at scene's preupdate event of next tick
        PreUpdateDelayCall(this.parent, 0, this.complete, this);
        return this;
    }

    waitTime(duration) {
        var timeline = this.parent.timeline
        timeline.delayEvent(duration, 'delay');

        // Clear delay event on timeline manually
        this.parent.once(RemoveWaitEvents, function () {
            timeline.removeDelayEvent('delay');
        });
        return this.waitEvent(timeline, 'delay');
    }
}

var Methods = {
    waitAny: WaitAny,
}

Object.assign(
    WaitEventManager.prototype,
    WaitInputMethods,
    WaitGameObjectMethods,
    WaitCameraMethods,
    WaitMusicMethods,
    Methods,
)

export default WaitEventManager;