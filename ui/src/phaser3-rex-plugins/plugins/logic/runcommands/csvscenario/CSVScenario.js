import EventEmitterMethods from '../../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../../utils/object/GetValue.js';
import CSVParser from 'papaparse/papaparse.min.js';
import InstMem from './InstMem.js';
import CmdHandlers from './commands/CmdHandlers.js';
import { WaitComplete } from '../../../utils/promise/WaitEvent.js';


class CSVScenario {
    constructor(scene, config) {
        // Event emitter
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

        this.scene = scene;
        this.timer = undefined;
        this._timeScale = 1;
        this.instMem = new InstMem(this);
        this.cmdHandlers = new CmdHandlers(this);
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this._inRunCmdLoop = false;
        this.isRunning = GetValue(o, 'state', false);
        this.isPaused = GetValue(o, 'pause', false);
        this.waitEvent = GetValue(o, 'wait', undefined);
        this.scope = GetValue(o, 'scope', undefined);
        this.timeUnit = GetValue(o, 'timeUnit', 0);
        this.cmdPrefix = GetValue(o, 'prefix', DEFAULT_PREFIX);
        this.argsConvert = GetValue(o, 'argsConvert', true);
        this.argsConvertScope = GetValue(o, 'argsConvertScope', undefined);
        this.cmdHandlers.resetFromJSON(GetValue(o, 'handlers', undefined));
        this.instMem.resetFromJSON(GetValue(o, 'instMem', undefined));
        this.delimiter = GetValue(o, 'delimiter', ',');
        this.translateCommandNameCallback = GetValue(o, 'translateCommandNameCallback', undefined);
        return this;
    }

    toJSON() {
        return {
            state: this.isRunning,
            pause: this.isPaused,
            wait: this.waitEvent,
            scope: this.scope,
            timeUnit: this.timeUnit,
            prefix: this.cmdPrefix,
            argsConvert: this.argsConvert,
            argsConvertScope: this.argsConvertScope,
            handlers: this.cmdHandlers.toJSON(),
            instMem: this.instMem.toJSON(),
            delimiter: this.delimiter
        };
    }

    boot() {
        this.scene.sys.events.once('shutdown', this.destroy, this);
    }

    shutdown() {
        if (!this.scene) {
            return
        }

        this.destroyEventEmitter();
        this.clear();
        this.scene.sys.events.off('shutdown', this.destroy, this);
        this.scene = undefined;
    }

    destroy() {
        this.shutdown();
    }

    load(strCmd, scope, config) {
        this.clear();

        this.timeUnit = GetValue(config, 'timeUnit', this.timeUnit);
        if (typeof (this.timeUnit) === 'string') {
            this.timeUnit = TIMEUNITMODE[this.timeUnit];
        }
        this.cmdPrefix = GetValue(config, 'prefix', this.cmdPrefix);
        if (typeof (this.cmdPrefix) === 'string') {
            this.cmdPrefix = new RegExp(this.cmdPrefix);
        }
        this.argsConvert = GetValue(config, 'argsConvert', this.argsConvert);
        this.argsConvertScope = GetValue(config, 'argsConvertScope', this.argsConvertScope);
        this.scope = scope;

        this.delimiter = GetValue(config, 'delimiter', this.delimiter);
        this.translateCommandNameCallback = GetValue(config, 'translateCommandNameCallback', this.translateCommandNameCallback);

        this.append(strCmd);
        return this;
    }

    clear() {
        this.stop();
        this.instMem.resetFromJSON();
        this.cmdHandlers.resetFromJSON();
    }

    start(config) {
        this.stop();
        var label = GetValue(config, 'label', '');
        this.offset = GetValue(config, 'offset', 0);
        if (this.isDebugMode) {
            this.log('Start at Label: ' + label);
        }

        var result = this.goto(label);
        if (!result) {
            return false;
        }

        this.isRunning = true;
        this.runNextCmd();
        return true;
    }

    play(config) {
        this.start(config);
        return this;
    }

    playPromise(config) {
        var promise = WaitComplete(this);
        this.start(config);
        return promise;
    }

    getIndex(label) {
        var index = this.getCmdHandler('label').getIndex(label);
        if (index == null) {
            this.error(`Label: ${label} is not found`);
        }
        return index;
    }

    goto(label) {
        var index;
        if (typeof (label) === 'string') {
            index = this.getIndex(label);
        } else {
            index = label;
        }
        if (index == null) {
            return false;
        }
        this.instMem.setNextIndex(index);
        return true;
    }

    get timeScale() {
        return this._timeScale;
    }

    set timeScale(value) {
        this._timeScale = value;
        if (this.timer) {
            this.timer.timeScale = value;
        }
    }

    setTimeScale(timeScale) {
        this.timeScale = timeScale;
        return this;
    }

    wait(eventName) {
        this.waitEvent = eventName;
        if (typeof (eventName) === 'number') {
            var delay = eventName;
            if (this.timeUnit === 1) {
                delay *= 1000;
            }
            this.timer = this.scene.time.delayedCall(delay, this.continue, [eventName], this);
            this.timer.timeScale = this._timeScale;
        } else {
            this.emit(`wait.${eventName}`, this);
        }

        this.emit('wait', eventName, this);
        return this;
    }

    stop() {
        if (!this.isRunning) {
            return this;
        }

        this.isRunning = false;
        this.isPaused = false;

        // clear wait event
        this.waitEvent = undefined;
        if (this.timer) {
            this.timer.remove();
            this.timer = undefined;
        }

        return this;
    }

    complete() {
        this.emit('complete', this.scope, this);
        this.stop();
        return this;
    }

    append(csvString) {
        var arr = CSVParser.parse(csvString, {
            delimiter: this.delimiter
        }).data;
        this.parse(arr);
        return this;
    }

    pause() {
        if (!this.isRunning) {
            return this;
        }
        if (this.isPaused) {
            return this;
        }

        this.isPaused = true;
        if (this.timer) {
            this.timer.paused = true;
        }
        return this;
    }

    resume() {
        if (!this.isRunning) {
            return this;
        }
        if (!this.isPaused) {
            return this;
        }

        this.isPaused = false;
        if (this.timer) {
            this.timer.paused = false;
        }
        return this;
    }

    continue(eventName) {
        if ((!this.isRunning) ||
            this.isPaused ||
            (this.waitEvent === undefined)) {
            return this;
        }

        if ((eventName === true) || (eventName === this.waitEvent)) {
            this.waitEvent = undefined;
            if (this.timer) {
                this.timer.remove();
                this.timer = undefined;
            }
            this.runNextCmd();
        }
        return this;
    }

    get lastLabel() {
        return this.cmdHandlers.cmds.label.lastLabel;
    }

    get previousLabel() {
        return this.cmdHandlers.cmds.label.prevLabel;
    }

    get lastCustomCommandName() {
        return this.cmdHandlers.cmds['-'].lastMethodName;
    }

    getCmdHandler(name) {
        if (typeof (name) !== 'string') {
            name = name[0];
        }
        return this.cmdHandlers.get(name);
    }

    parse(arr) {
        var item, name, prefix = this.cmdPrefix;
        for (var i = 0, len = arr.length; i < len; i++) {
            item = arr[i];
            name = item[0];
            if (name === '-') {
                this.appendCustomCommand(item);

            } else if (!isNaN(name)) {
                var time = parseFloat(name);
                if (time > 0) {
                    // insert 'wait' command
                    this.appendCommand(['wait', time]);
                }
                this.appendCustomCommand(item);

            } else if (prefix.test(name)) {
                var innerMatch = name.match(prefix);
                item[0] = innerMatch[1].toLowerCase();
                var isValid = this.appendCommand(item);

                if (!isValid) {
                    this.error(`Line ${i}: ${JSON.stringify(item)} is not a valid command`);
                }

            } else {
                // insert 'wait' command
                this.appendCommand(['wait', name]);
                item[0] = '-';
                this.appendCommand(item);
            }
        }

        return this;
    }

    appendCommand(inst) {
        var handler = this.getCmdHandler(inst);
        if (handler == null) {
            return false;
        }
        inst = handler.parse(inst, this.instMem.length);
        if (inst) {
            this.instMem.append(inst);
        }
        return true;
    }

    appendCustomCommand(inst) {
        inst[0] = '-';
        if (this.translateCommandNameCallback) {
            inst[1] = this.translateCommandNameCallback(inst[1]);
        }
        return this.appendCommand(inst);
    }

    runNextCmd() {
        if (this._inRunCmdLoop) { // prevent re-entry
            return;
        }

        var instMem = this.instMem;
        var inst;
        this._inRunCmdLoop = true;
        while (
            this.isRunning &&
            (!this.isPaused) &&
            (this.waitEvent === undefined)
        ) {
            inst = instMem.get();
            instMem.setNextIndex();
            if (inst == null) {
                this.complete();
                break;
            }
            this.getCmdHandler(inst).run(inst);
        }
        this._inRunCmdLoop = false;
        return this;
    }

    log(msg) {
        this.emit('log', msg, this.scope, this);
        return this;
    }

    get isDebugMode() {
        return (this.listenerCount('log') > 0);
    }

    error(msg) {
        this.emit('error', msg, this.scope, this);
        return this;
    }
}

Object.assign(
    CSVScenario.prototype,
    EventEmitterMethods
);

const TIMEUNITMODE = {
    ms: 0,
    s: 1,
    sec: 1
};
const DEFAULT_PREFIX = /^#([a-zA-Z]+)/;

export default CSVScenario;