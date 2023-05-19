import EventEmitterMethods from '../../eventemitter/EventEmitterMethods.js';
import BobBase from './bobbase/BobBase.js';
import IsEmpty from '../../object/IsEmpty.js';
import Methods from './methods/Methods.js';
import GetViewport from '../../system/GetViewport.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class GOManager {
    constructor(scene, config) {
        this.scene = scene;

        this.BobClass = GetValue(config, 'BobClass', BobBase);
        this.setCreateGameObjectCallback(
            GetValue(config, 'createGameObject'),
            GetValue(config, 'createGameObjectScope')
        );
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

        var fadeConfig = GetValue(config, 'fade', 500);
        if (typeof (fadeConfig) === 'number') {
            this.setGOFadeMode();
            this.setGOFadeTime(fadeConfig);
        } else {
            this.setGOFadeMode(GetValue(fadeConfig, 'mode'));
            this.setGOFadeTime(GetValue(fadeConfig, 'time', 500));
        }

        var viewportCoordinateConfig = GetValue(config, 'viewportCoordinate', false);
        if (viewportCoordinateConfig !== false) {
            this.setViewportCoordinateEnable(GetValue(config, 'enable', true));
            this.setViewport(GetValue(viewportCoordinateConfig, 'viewport'))
        } else {
            this.setViewportCoordinateEnable(false);
        }

        this.setSymbols(GetValue(config, 'symbols'));

        this.bobs = {};
        this.removedGOs = [];
        this._timeScale = 1;
    }

    destroy(fromScene) {
        this.clear(!fromScene);
        this.createGameObjectCallback = undefined;
        this.viewport = undefined;
        this.scene = undefined;
    }

    set timeScale(timeScale) {
        if (this._timeScale === timeScale) {
            return;
        }

        this._timeScale = timeScale;

        var bobs = this.bobs;
        for (var name in bobs) {
            bobs[name].setTimeScale(timeScale);
        }
    }

    get timeScale() {
        return this._timeScale;
    }

    setTimeScale(timeScale) {
        this.timeScale = timeScale;
        return this;
    }

    setCreateGameObjectCallback(callback, scope) {
        this.createGameObjectCallback = callback;
        this.createGameObjectScope = scope;
        return this;
    }

    setViewportCoordinateEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }

        this.viewportCoordinateEnable = enable;
        return this;
    }

    setViewport(viewport) {
        if (viewport === undefined) {
            viewport = GetViewport(this.scene, this.scene.cameras.main);
        }

        this.viewport = viewport;
        return this;
    }

    setSymbols(symbols) {
        this.symbols = symbols;
        return this;
    }

    get isEmpty() {
        return IsEmpty(this.bobs) && (this.removedGOs.length === 0);
    }

}

Object.assign(
    GOManager.prototype,
    EventEmitterMethods,
    Methods
);

export default GOManager;