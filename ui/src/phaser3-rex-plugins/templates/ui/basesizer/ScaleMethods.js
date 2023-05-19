import PopUp from '../../../plugins/popup.js';
import ScaleDownDestroy from '../../../plugins/scale-down-destroy.js';
import Yoyo from '../../../plugins/behaviors/scale/Yoyo.js';
import { WaitComplete } from '../utils/WaitEvent.js'
import GetParentSizerMethods from './GetParentSizerMethods.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

var OnInitScale = function (gameObject, scale) {
    // Route 'complete' of scale to gameObject
    scale.completeEventName = undefined;
    scale.on('complete', function () {
        if (scale.completeEventName) {
            gameObject.emit(scale.completeEventName, gameObject);
            scale.completeEventName = undefined;
        }
    })

    // Update local state
    scale.on('update', function () {
        var parent = GetParentSizerMethods.getParentSizer(gameObject)
        if (parent) {
            parent.resetChildPositionState(gameObject);
        }
    })
}

export default {
    popUp(duration, orientation, ease) {
        if (IsPlainObject(duration)) {
            var config = duration;
            duration = config.duration;
            orientation = config.orientation;
            ease = config.ease;
        }

        var isInit = (this._scaleBehavior === undefined);

        this._scaleBehavior = PopUp(this, duration, orientation, ease, this._scaleBehavior);

        if (isInit) {
            OnInitScale(this, this._scaleBehavior);
        }

        this._scaleBehavior.completeEventName = 'popup.complete';

        return this;
    },

    popUpPromise(duration, orientation, ease) {
        this.popUp(duration, orientation, ease);
        return WaitComplete(this._scaleBehavior);
    },

    scaleDownDestroy(duration, orientation, ease, destroyMode) {
        if (IsPlainObject(duration)) {
            var config = duration;
            duration = config.duration;
            orientation = config.orientation;
            ease = config.ease;
            destroyMode = config.destroy;
        }

        var isInit = (this._scaleBehavior === undefined);

        this._scaleBehavior = ScaleDownDestroy(this, duration, orientation, ease, destroyMode, this._scaleBehavior);

        if (isInit) {
            OnInitScale(this, this._scaleBehavior);
        }

        this._scaleBehavior.completeEventName = 'scaledown.complete';

        return this;
    },

    scaleDownDestroyPromise(duration, orientation, ease, destroyMode) {
        this.scaleDownDestroy(duration, orientation, ease, destroyMode);
        return WaitComplete(this._scaleBehavior);
    },

    scaleDown(duration, orientation, ease) {
        this.scaleDownDestroy(duration, orientation, ease, false);
        return this;
    },

    scaleDownPromise(duration, orientation, ease) {
        this.scaleDown(duration, orientation, ease);
        return WaitComplete(this._scaleBehavior);
    },

    scaleYoyo(duration, peakValue, repeat, orientation, ease) {
        if (IsPlainObject(duration)) {
            var config = duration;
            duration = config.duration;
            peakValue = config.peakValue;
            repeat = config.repeat;
            orientation = config.orientation;
            ease = config.ease;
        }

        var isInit = (this._scaleBehavior === undefined);

        this._scaleBehavior = Yoyo(this, duration, peakValue, repeat, orientation, ease, this._scaleBehavior);

        if (isInit) {
            OnInitScale(this, this._scaleBehavior);
        }

        this._scaleBehavior.completeEventName = 'scaleyoyo.complete';

        return this;
    },

    scaleYoyoPromise(duration, peakValue, repeat, orientation, ease) {
        this.scaleYoyo(duration, peakValue, repeat, orientation, ease);
        return WaitComplete(this._scaleBehavior);
    },


}