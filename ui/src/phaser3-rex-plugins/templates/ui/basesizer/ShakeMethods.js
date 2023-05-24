import Shake from '../shake/Shake.js';
import { WaitComplete } from '../utils/WaitEvent.js'

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

var OnInitShake = function (gameObject, shake) {
    // Route 'complete' of shake to gameObject
    shake.on('complete', function () {
        gameObject.emit('shake.complete', gameObject);
    })

    // Shake effect won't change position
}

export default {
    shake(duration, magnitude, magnitudeMode) {
        if (IsPlainObject(duration)) {
            var config = duration;
            duration = config.duration;
            magnitude = config.magnitude;
            magnitudeMode = config.magnitudeMode;
        }

        if (this._shake === undefined) {
            this._shake = new Shake(this, {
                mode: 0,
                magnitudeMode: 1
            });
            OnInitShake(this, this._shake);
        }

        if (duration !== undefined) {
            this._shake.setDuration(duration);
        }

        if (magnitude !== undefined) {
            this._shake.setMagnitude(magnitude);
        }

        if (magnitudeMode !== undefined) {
            this._shake.setMagnitudeMode(magnitudeMode);
        }

        this._shake.shake();

        return this;
    },

    shakePromise(duration, alpha) {
        this.shake(duration, alpha);
        return WaitComplete(this._shake);
    },
}