import ComponentBase from '../../../utils/componentbase/ComponentBase.js';
import Clock from '../../../clock.js';
import ArrayCopy from '../../../utils/array/Copy.js';
import RunCommands from '../../../runcommands.js';
import IsArray from '../../../utils/object/IsArray.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Player extends ComponentBase {
    constructor(parent, config) {
        super(parent, config);

        var clock = GetValue(config, 'clock', undefined);
        if (!clock) {
            clock = new Clock(parent);
        }
        this.clock = clock;
        this.clock.on('update', this.update, this);

        this.resetFromJSON(config); // this function had been called in super(config)
    }

    resetFromJSON(o) {
        this.clock.resetFromJSON(GetValue(o, 'clock', undefined));
        this.state = GetValue(o, 'state', 0); // 0=idle, 1=run, 2=completed
        this.commands = GetValue(o, 'commands', []); // [[time, cmds], [time, cmds], ...]
        this.scope = GetValue(o, 'scope', undefined);
        this.setTimeUnit(GetValue(o, 'timeUnit', 0));
        this.setDtMode(GetValue(o, 'dtMode', 0));
        this.index = GetValue(o, 'index', 0);
        this.nextTime = GetValue(o, 'nextTime', 0);
        return this;
    }

    toJSON() {
        return {
            clock: this.clock.toJSON(),
            state: this.state,
            commands: this.commands,
            scope: this.scope,
            timeUnit: this.timeUnit,
            dtMode: this.dtMode,
            index: this.index,
            nextTime: this.nextTime
        };
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.clock.shutdown(fromScene);
        this.commands = undefined;

        super.shutdown(fromScene);
    }

    load(commands, scope, config) {
        this.stop();
        var timeUnit = GetValue(config, 'timeUnit', undefined);
        if (timeUnit !== undefined) {
            this.setTimeUnit(timeUnit)
        }
        var dtMode = GetValue(config, 'dtMode', undefined);
        if (dtMode !== undefined) {
            this.setDtMode(dtMode);
        }
        commands = commands
            .filter(function (item) {
                var dt = item[0];
                return !isNaN(dt);
            })
            .map(function (item) {
                var dt = item[0];
                if (typeof (dt) === 'string') {
                    item[0] = parseFloat(item[0]);
                }
                return item;
            });

        if (this.dtMode === 0) {
            commands.sort(function (itemA, itemB) {
                var dtA = itemA[0],
                    dtB = itemB[0];
                return (dtA > dtB) ? 1 :
                    (dtA < dtB) ? -1 : 0;
            });
        }

        this.commands = commands;
        this.scope = scope;
        return this;
    }

    start(startAt) {
        if (startAt === undefined) {
            startAt = 0;
        }

        this.stop();

        this.index = 0;
        this.state = 1;
        this.nextTime = this.getNextDt(0);

        this.clock.start(startAt);
        this.update(startAt);
        this.emit('start', this.parent, this);
        return this;
    }

    pause() {
        this.clock.pause();
        this.emit('pause', this.parent, this);
        return this;
    }

    resume() {
        this.clock.resume();
        this.emit('resume', this.parent, this);
        return this;
    }

    stop() {
        this.clock.stop();
        this.state = 0;
        this.emit('stop', this.parent, this);
        return this;
    }

    seek(time) {
        this.clock.seek(time);
        return this;
    }

    seekToNext() {
        this.seek(this.nextTime);
        return this;
    }

    get isPlaying() {
        return this.clock.isRunning;
    }

    get completed() {
        return (this.state === 2);
    }

    get timeScale() {
        return this.clock.timeScale;
    }

    set timeScale(timeScale) {
        this.clock.timeScale = timeScale;
    }

    setTimeScale(timeScale) {
        this.timeScale = timeScale;
        return this;
    }

    get now() {
        return this.clock.now;
    }

    update(now) {
        if (this.nextTime > now) {
            return this;
        }
        var lastCommandIndex = this.commands.length - 1;
        while (1) {
            // Execute a command
            var item = this.commands[this.index];
            var command = item[1];
            if (!IsArray(command)) { // [dt, fnName, param0, param1, ...]
                command = ArrayCopy(CMD, item, 1);
            }
            RunCommands(command, this.scope);
            this.emit('runcommand', command, this.scope);
            // Execute a command

            if (this.index === lastCommandIndex) {
                this.complete();
                return this;
            } else {
                // Get next time
                this.index++; // Point to next command
                this.nextTime = this.getNextDt(this.nextTime);
                if (this.nextTime > now) {
                    return this;
                }
                // Get next time
            }

        }
    }

    complete() {
        this.clock.stop();
        this.state = 2;
        this.emit('complete', this.parent, this);
    }

    getNextDt(currentDt) {
        var time = this.commands[this.index][0];
        if (this.timeUnit === 1) { // Second mode
            time = time * 1000;
        }

        if (this.dtMode === 1) {
            time += currentDt;
        }

        return time;
    }

    setDtMode(dtMode) {
        if (typeof (dtMode) === 'string') {
            dtMode = DTMODE[dtMode];
        }
        this.dtMode = dtMode;
        return this;
    }

    setTimeUnit(timeUnit) {
        if (typeof (timeUnit) === 'string') {
            timeUnit = TIMEUNITMODE[timeUnit];
        }
        this.timeUnit = timeUnit;
        return this;
    }
}

var CMD = []; // reuse this array

const TIMEUNITMODE = {
    ms: 0,
    s: 1,
    sec: 1,
};

const DTMODE = {
    abs: 0,
    absolute: 0,
    inc: 1,
    increment: 1
};

export default Player;