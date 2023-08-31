import FSMBase from './FSMBase.js';
import GetValue from '../../utils/object/GetValue.js';
import HasListener from '../../utils/eventemitter/HasListener.js';

const StateProperties = ['next', 'exit', 'enter', 'update', 'preupdate', 'postupdate'];

class FSM extends FSMBase {
    /*
    var config = {
        start: 'A',   // default: undefined
        states: {
            A: {
                next: 'B',  // function() { return 'B'; }
                enter: function() {},
                exit: function() {},
                update: function(time, delta) {},
                preupdate: function(time, delta) {},
                postupdate: function(time, delta) {},
            },
            // ...
        },        
        extend: {
            i: 0,
            name: 'abc'
            // ...
        },
        init: function() {},
        enable: true,
        scene: undefined,
        eventEmitter: true,
    };
    */
    shutdown() {
        this.stopUpdate();
        this.stopPreUpdate();
        this.stopPostUpdate();
        this._scene = undefined;

        super.shutdown();
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);
        this._scene = GetValue(o, 'scene', undefined);
        return this;
    }

    get stateProperties() {
        return StateProperties;
    }

    update(time, delta) {
        this.runMethod('update', time, delta);
    }

    preupdate(time, delta) {
        this.runMethod('preupdate', time, delta);
    }

    postupdate(time, delta) {
        this.runMethod('postupdate', time, delta);
    }

    startUpdate(scene) {
        if (!scene) {
            scene = this._scene;
        }

        var eventEmitter = scene.sys.events;
        if (HasListener(eventEmitter, 'update', this.update, this)) {
            return this;
        }

        this._scene = scene;
        eventEmitter.on('update', this.update, this);
        return this;
    }

    stopUpdate() {
        if (!this._scene) {
            return this;
        }

        this._scene.sys.events.off('update', this.update, this);
        return this;
    }

    startPreUpdate(scene) {
        if (!scene) {
            scene = this._scene;
        }

        var eventEmitter = scene.sys.events;
        if (HasListener(eventEmitter, 'preupdate', this.preupdate, this)) {
            return this;
        }

        this._scene = scene;
        eventEmitter.on('preupdate', this.preupdate, this);
        return this;
    }

    stopPreUpdate() {
        if (!this._scene) {
            return this;
        }

        this._scene.sys.events.off('preupdate', this.preupdate, this);
        return this;
    }

    startPostUpdate(scene) {
        if (!scene) {
            scene = this._scene;
        }

        var eventEmitter = scene.sys.events;
        if (HasListener(eventEmitter, 'postupdate', this.postupdate, this)) {
            return this;
        }

        this._scene = scene;
        eventEmitter.on('postupdate', this.postupdate, this);
        return this;
    }

    stopPostUpdate() {
        if (!this._scene) {
            return this;
        }

        this._scene.sys.events.off('postupdate', this.postupdate, this);
        return this;
    }
}

export default FSM;