import { EaseMoveTo, EaseMoveFrom } from '../easemove/EaseMove.js';
import { WaitComplete } from '../utils/WaitEvent.js';
import GetParentSizerMethods from './GetParentSizerMethods.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const DistanceBetween = Phaser.Math.Distance.Between;

var OnInitEaseMove = function (gameObject, easeMove) {
    // Route 'complete' of easeMove to gameObject
    easeMove.completeEventName = undefined;
    easeMove.on('complete', function () {
        if (easeMove.completeEventName) {
            gameObject.emit(easeMove.completeEventName, gameObject);
            easeMove.completeEventName = undefined;
        }
    })

    // Update local state
    easeMove.on('update', function () {
        var parent = GetParentSizerMethods.getParentSizer(gameObject);
        if (parent) {
            parent.resetChildPositionState(gameObject);
        }
    })
}

export default {
    moveFrom(duration, x, y, ease, destroyMode) {
        if (IsPlainObject(duration)) {
            var config = duration;
            x = config.x;
            y = config.y;
            if (config.hasOwnProperty('speed')) {
                duration = (DistanceBetween(x, y, this.x, this.y) * 1000) / config.speed;
            } else {
                duration = config.duration;
            }

            ease = config.ease;
        }

        var isInit = (this._easeMove === undefined);

        this._easeMove = EaseMoveFrom(this, duration, x, y, ease, destroyMode, this._easeMove);

        if (isInit) {
            OnInitEaseMove(this, this._easeMove);
        }

        this._easeMove.completeEventName = 'movefrom.complete';

        return this;
    },

    moveFromPromise(duration, x, y, ease, destroyMode) {
        this.moveFrom(duration, x, y, ease, destroyMode);
        return WaitComplete(this._easeMove);
    },

    moveFromDestroy(duration, x, y, ease) {
        this.moveFrom(duration, x, y, ease, true);
        return this;
    },

    moveFromDestroyPromise(duration, x, y, ease) {
        this.moveFromDestroy(duration, x, y, ease);
        return WaitComplete(this._easeMove);
    },

    moveTo(duration, x, y, ease, destroyMode) {
        if (IsPlainObject(duration)) {
            var config = duration;
            x = config.x;
            y = config.y;
            if (config.hasOwnProperty('speed')) {
                duration = (DistanceBetween(x, y, this.x, this.y) * 1000) / config.speed;
            } else {
                duration = config.duration;
            }

            ease = config.ease;
        }

        var isInit = (this._easeMove === undefined);

        this._easeMove = EaseMoveTo(this, duration, x, y, ease, destroyMode, this._easeMove);

        if (isInit) {
            OnInitEaseMove(this, this._easeMove);
        }

        this._easeMove.completeEventName = 'moveto.complete';

        return this;
    },

    moveToPromise(duration, x, y, ease, destroyMode) {
        this.moveTo(duration, x, y, ease, destroyMode);
        return WaitComplete(this._easeMove);
    },

    moveToDestroy(duration, x, y, ease) {
        this.moveTo(duration, x, y, ease, true)
        return this;
    },

    moveToDestroyPromise(duration, x, y, ease) {
        this.moveToDestroy(duration, x, y, ease, true);
        return WaitComplete(this._easeMove);
    },

    moveStop(toEnd) {
        if (!this._easeMove) {
            return this;
        }

        this._easeMove.stop(toEnd);
        return this;
    }
}