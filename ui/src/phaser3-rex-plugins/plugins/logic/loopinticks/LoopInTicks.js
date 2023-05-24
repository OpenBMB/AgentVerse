import TickTask from '../../utils/componentbase/TickTask.js';
import LoopIndexGenerator from '../loopindexgenerator/LoopIndexGenerator.js';
import Clear from '../../utils/object/Clear.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class LoopInTicks extends TickTask {
    constructor(scene, config) {
        super(scene, config);

        this.deltaPeriod = 1000 / scene.game.loop.targetFps;
        this.deltaPercentage = 1;
        this.loopIndexGenerator = new LoopIndexGenerator();
        this.currentIndexes = {};
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.setCallback(GetValue(o, 'callback', this.callback), GetValue(o, 'scope', this.scope));
        this.setDeltaPercentage(GetValue(o, 'deltaPercentage', this.deltaPercentage));
        this.loopIndexGenerator.reset();
        Clear(this.currentIndexes);
        return this;
    }

    startTicking() {
        super.startTicking();
        this.scene.sys.events.on('preupdate', this.preupdate, this);
    }

    stopTicking() {
        super.stopTicking();
        if (this.scene) { // Scene might be destoryed
            this.scene.sys.events.off('preupdate', this.preupdate, this);
        }
    }

    setCallback(callback, scope) {
        this.callback = callback;
        this.scope = scope;
        return this;
    }

    setDeltaPercentage(percentage) {
        this.deltaPercentage = percentage;
        return this;
    }

    addNumberLoop(key, start, end, step) {
        this.loopIndexGenerator.addNumberLoop(key, start, end, step);
        return this;
    }

    addItemsLoop(key, items, reverse) {
        this.loopIndexGenerator.addItemsLoop(key, items, reverse);
        return this;
    }

    addLoop(config) {
        this.loopIndexGenerator.addLoop(config);
        return this;
    }

    get curTime() {
        return new Date().getTime();
    }

    get progress() {
        return this.loopIndexGenerator.progress;
    }

    preupdate(time, delta) {
        if ((!this.isRunning) || (!this.callback)) {
            return;
        }

        var startTime = this.curTime;
        var totalTime = this.deltaPeriod * this.deltaPercentage;
        var isTimeOut;
        this.emit('tickstart', this);
        do {
            if (this.loopIndexGenerator.isEnd) {
                this.complete();
                return;
            }

            this.currentIndexes = this.loopIndexGenerator.getNext(this.currentIndexes);
            if (this.scope) {
                this.callback.call(this.scope, this.currentIndexes, this);
            } else {
                this.callback(this.currentIndexes, this);
            }
            isTimeOut = (this.curTime - startTime) >= totalTime;
        } while (!isTimeOut)
        this.emit('tickend', this);
        return;
    }
}

export default LoopInTicks;