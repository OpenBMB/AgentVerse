import EventEmitter from 'eventemitter3';
import GetValue from '../../utils/object/GetValue.js';
import GetPeriodMS from '../../utils/time/GetPeriodMS.js';
import RemoveItems from '../../utils/array/Remove.js';

class RealTimeTimers extends EventEmitter {
    constructor(config) {
        super();

        var getTimestampCallback = GetValue(config, 'getTimestampCallback');
        if (!getTimestampCallback) {
            this.setStartTimestamp(GetValue(config, 'startTimestamp'));
            getTimestampCallback = GetCurrentTimestampFromStartCallback.bind(this);
        }
        this.setGetTimestampCallback(getTimestampCallback);

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.timers = GetValue(o, 'timers', []);
        return this;
    }

    toJSON() {
        return {
            timers: this.timers
        }
    }

    setStartTimestamp(timestamp) {
        if (timestamp === undefined) {
            timestamp = new Date().getTime();
        }
        this.startTimestamp = timestamp - window.performance.now();
        return this;
    }

    setGetTimestampCallback(callback) {
        this.getCurrentTimestampCallback = callback;
        return this;
    }

    addTimer(name, period, data, currentTimestamp) {
        if (currentTimestamp === undefined) {
            currentTimestamp = this.getCurrentTimestampCallback();
        }

        period = GetPeriodMS(period);

        var timer = {
            name: name,
            start: currentTimestamp,
            period: period,
            data: data
        }
        if (data !== undefined) {
            timer.data = data;
        }
        this._add(timer);

        return this;
    }

    incTimerPeriod(name, period) {
        period = GetPeriodMS(period);
        for (var i = 0, cnt = this.timers.length; i < cnt; i++) {
            var timer = this.timers[i];
            if (timer.name === name) {
                timer.period += period;
            }
        }

        this.emitUpdateEvent();

        return this;
    }

    getExpiredTimers(currentTimestamp) {
        if (currentTimestamp === undefined) {
            currentTimestamp = this.getCurrentTimestampCallback();
        }

        var result = [];
        for (var i = 0, cnt = this.timers.length; i < cnt; i++) {
            var timer = this.timers[i];
            if (currentTimestamp >= (timer.start + timer.period)) {
                result.push(timer);
            }
        }
        return result;
    }

    popExpiredTimers(currentTimestamp) {
        var result = this.getExpiredTimers(currentTimestamp);
        this._remove(result);
        return result;
    }

    getTimersProgress(currentTimestamp) {
        if (currentTimestamp === undefined) {
            currentTimestamp = this.getCurrentTimestampCallback();
        }

        var result = [];
        for (var i = 0, cnt = this.timers.length; i < cnt; i++) {
            var timer = this.timers[i];
            var elapsed = currentTimestamp - timer.start;
            var period = timer.period;
            elapsed = Math.min(elapsed, period);
            var progress = elapsed / period;
            result.push({
                name: timer.name,
                period: period,
                elapsed: elapsed,
                progress: progress,
                timer: timer
            })
        }
        return result;
    }

    getTimers(name) {
        if (name === undefined) {
            // Get all timers
            return this.timers.slice();
        }

        var result = [];
        for (var i = 0, cnt = this.timers.length; i < cnt; i++) {
            var timer = this.timers[i];
            if (timer.name === name) {
                result.push(timer);
            }
        }
        return result;
    }

    removeTimers(timers) {
        if (typeof (timers) !== 'object') { // string or number
            timers = this.getTimers(timers);
        }
        if (!Array.isArray(timers)) {
            timers = [timers];
        }
        this._remove(timers);
        return this;
    }

    clearTimers() {
        var timers = this.getTimers();
        timers.reverse();
        this.removeTimers(timers);
        return this;
    }

    get length() {
        return this.timers.length;
    }

    get lastTimer() {
        return this.timers[this.timers.length - 1];
    }

    emitUpdateEvent() {
        this.emit('update', this.timers);
        return this;
    }

    // Internal
    _add(timer) {
        this.timers.push(timer);

        this.emit('add', timer, this.timers);
        this.emitUpdateEvent();
    }

    // Internal
    _remove(timers) {
        RemoveItems(this.timers, timers, function (timer) {
            this.emit('remove', timer, this.timers);
        }, this);
        this.emitUpdateEvent();
    }

}

var GetCurrentTimestampFromStartCallback = function () {
    return this.startTimestamp + window.performance.now();
}

export default RealTimeTimers;