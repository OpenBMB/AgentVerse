import { FadeIn, FadeOutDestroy } from '../fade/Fade.js';
import { WaitComplete } from '../utils/WaitEvent.js';
import GetParentSizerMethods from './GetParentSizerMethods.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

var OnInitFade = function (gameObject, fade) {
    // Route 'complete' of fade to gameObject
    fade.completeEventName = undefined;
    fade.on('complete', function () {
        if (fade.completeEventName) {
            gameObject.emit(fade.completeEventName, gameObject);
            fade.completeEventName = undefined;
        }
    })

    // Update local state
    fade.on('update', function () {
        var parent = GetParentSizerMethods.getParentSizer(gameObject);
        if (parent) {
            parent.resetChildAlphaState(gameObject);
        }
    })
}

export default {
    fadeIn(duration, alpha) {
        if (IsPlainObject(duration)) {
            var config = duration;
            duration = config.duration;
            alpha = config.alpha;
        }

        var isInit = (this._fade === undefined);

        this._fade = FadeIn(this, duration, alpha, this._fade);

        if (isInit) {
            OnInitFade(this, this._fade);
        }

        this._fade.completeEventName = 'fadein.complete';

        return this;
    },

    fadeInPromise(duration, alpha) {
        this.fadeIn(duration, alpha);
        return WaitComplete(this._fade);
    },

    fadeOutDestroy(duration, destroyMode) {
        if (IsPlainObject(duration)) {
            var config = duration;
            duration = config.duration;
            destroyMode = config.destroy;
        }

        var isInit = (this._fade === undefined);

        this._fade = FadeOutDestroy(this, duration, destroyMode, this._fade);

        if (isInit) {
            OnInitFade(this, this._fade);
        }

        this._fade.completeEventName = 'fadeout.complete';

        return this;
    },

    fadeOutDestroyPromise(duration, destroyMode) {
        this.fadeOutDestroy(duration, destroyMode);
        return WaitComplete(this._fade);
    },

    fadeOut(duration) {
        this.fadeOutDestroy(duration, false);
        return this;
    },

    fadeOutPromise(duration) {
        this.fadeOut(duration);
        return WaitComplete(this._fade);
    }
}