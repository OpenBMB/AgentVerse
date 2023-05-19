import StateManagerBase from './StateManagerBase.js';
import GetValue from '../../utils/object/GetValue.js';
import HasListener from '../../utils/eventemitter/HasListener.js';

class StateManager extends StateManagerBase {
    constructor(config) {
        super(config);

        this._scene = GetValue(config, 'scene', undefined);
    }

    shutdown() {
        this.stopUpdate();
        this.stopPreUpdate();
        this.stopPostUpdate();
        this._scene = undefined;

        super.shutdown();
    }

    getScene() {
        return this._scene;
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

    stopOreUpdate() {
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

export default StateManager;