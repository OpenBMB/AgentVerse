import Clock from '../clock/Clock.js';
import Timer from './Timer.js';
import Pool from './TimerPool.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const TimerPool = new Pool();

class Timeline extends Clock {
    constructor(parent, config) {
        super(parent, config);

        this.addedTimers = [];
        this.timers = [];
        this.timerPool = GetValue(config, 'pool', TimerPool);
    }

    shutdown() {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.timerPool
            .freeMultiple(this.addedTimers)
            .freeMultiple(this.timers);

        this.timerPool = undefined;
        this.addedTimers = undefined;
        this.timers = undefined;

        super.shutdown();
    }

    addTimer(config) {
        var timer = this.timerPool.allocate();
        if (!timer) {
            timer = new Timer(this, config)
        } else {
            timer
                .setTimeline(this)
                .reset(config)
        }
        this.addedTimers.push(timer);
        timer.runCallback(timer.onStart);

        if (!this.isRunning) {
            this.start();
        }
        return timer;
    }

    delayCall(delay, callback, args, scope) {
        var timer = this.addTimer({
            duration: delay,
            onComplete: function (target, t, timer) {
                if (args === undefined) {
                    args = [];
                }
                args.push(timer);
                callback.apply(scope, args);
            }
        })
        return timer;
    }

    delayEvent(delay, eventName) {       
        this.removeDelayEvent(eventName);
        // Clear existed event

        var timer = this.delayCall(delay, function () {
            this.removeDelayEvent(eventName);  // Clear this timer
            this.emit(eventName);           
        }, [], this);

        this.once(`_remove.${eventName}`, function () {
            timer.remove();
            timer = undefined;
        });
        return this;
    }

    removeDelayEvent(eventName) {
        this.emit(`_remove.${eventName}`);
        return this;
    }

    getTimers(name) {
        var timers = [];

        var timerQueues = [this.addedTimers, this.timers];
        for (var ti = 0, tcnt = timerQueues.length; ti < tcnt; ti++) {
            var timerQueue = timerQueues[ti];
            for (var i = 0, cnt = timerQueue.length; i < cnt; i++) {
                var timer = timerQueue[i];
                if (timer.name === name) {
                    timers.push(timer);
                }
            }
        }
        return timers;
    }

    update(time, delta) {
        super.update(time, delta);

        if (!this.isRunning) {
            return;
        }

        this.timers.push(...this.addedTimers);
        this.addedTimers.length = 0;
        var pendingTimers = [];
        for (var i = 0, cnt = this.timers.length; i < cnt; i++) {
            var timer = this.timers[i];
            var isStopped = timer.update(this.now, this.delta);
            if (isStopped) {
                this.timerPool.free(timer);  // Free timer
            } else {
                pendingTimers.push(timer);  // Add to timer queue
            }
        }
        this.timers = pendingTimers;

        if ((this.timers.length === 0) && (this.addedTimers.length === 0)) {
            this.complete(); // Emit 'complete' event
        }
    }
}

export default Timeline