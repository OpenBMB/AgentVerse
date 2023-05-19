import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../utils/object/GetValue.js';

class StateManagerBase {
    constructor(config) {
        this._states = {};
        this._stateLock = false;
        this.enable = true;
        this._start = undefined;
        this._state = undefined;
        this._prevState = undefined;

        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

    }

    shutdown() {
        this.destroyEventEmitter();
    }

    destroy() {
        this.shutdown();
    }

    toJSON() {
        return {
            curState: this.state,
            prevState: this.prevState,

            enable: this.enable,
            start: this._start
        };
    }

    setEnable(e) {
        if (e === undefined) {
            e = true;
        }
        this.enable = e;
        return this;
    }

    toggleEnable() {
        this.setEnable(!this.enable);
        return this;
    }

    getState(name) {
        return this._states[name];
    }

    addState(name, state) {
        if (typeof (name) !== 'string') {
            state = name;
            name = state.name;
        }
        this._states[name] = state;
        return this;
    }

    addStates(states) {
        if (Array.isArray(states)) {
            for (var i = 0, cnt = states.length; i < cnt; i++) {
                this.addState(states[i]);
            }
        } else {
            for (var name in states) {
                this.addState(name, states[name]);
            }
        }
        return this;
    }

    removeState(name) {
        if (this._states.hasOwnProperty(name)) {
            delete this._states[name];
        }
        return this;
    }

    removeAllStates() {
        for (var name in this._states) {
            delete this._states[name];
        }
        return this;
    }

    set state(newState) {
        if (!this.enable || this._stateLock) {
            return;
        }
        if (this._state === newState) {
            return;
        }

        this._prevState = this._state;
        this._state = newState;

        this._stateLock = true; // Lock state

        this.emit('statechange', this);

        if (this._prevState != null) {
            var state = this.getState(this._prevState);
            if (state && state.exit) {
                state.exit(this);
            }
            this.emit(`exit_${this._prevState}`, this);
        }

        this._stateLock = false;

        if (this._state != null) {
            var state = this.getState(this._state);
            if (state && state.enter) {
                state.enter(this);
            }
            this.emit(`enter_${this._state}`, this);
        }
    }

    get state() {
        return this._state;
    }

    get prevState() {
        return this._prevState;
    }

    get stateList() {
        return Object.keys(this._states);
    }

    start(state) {
        this._start = state;
        this._prevState = undefined;
        this._state = state; // Won't fire statechange events
        return this;
    }

    goto(nextState) {
        if (nextState != null) {
            this.state = nextState;
        }
        return this;
    }

    next() {
        var state = this.getState(this.state);
        if (!state || !state.next) {
            return this;
        }

        var nextState;
        if (typeof (state.next) === 'string') {
            nextState = state.next;
        } else {
            nextState = state.next(this);
        }
        this.goto(nextState);
        return this;
    }

    runMethod(methodName, a1, a2, a3, a4, a5) {
        var state = this.getState(this.state);
        if (!state) {
            return undefined;
        }
        var fn = state[methodName];
        if (!fn) {
            return undefined;
        }

        // Copy from eventemitter3
        var len = arguments.length;
        switch (len) {
            case 1: return fn(this);
            case 2: return fn(this, a1);
            case 3: return fn(this, a1, a2);
            case 4: return fn(this, a1, a2, a3);
            case 5: return fn(this, a1, a2, a3, a4);
            case 6: return fn(this, a1, a2, a3, a4, a5);
        }

        var args = Array.prototype.slice.call(arguments);
        args[0] = this;
        return fn.apply(undefined, args);
    }
}

Object.assign(
    StateManagerBase.prototype,
    EventEmitterMethods
);

export default StateManagerBase;