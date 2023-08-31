import { EaseData } from '../../../plugins/easedata.js';
import { WaitEvent } from '../utils/WaitEvent.js';

var OnInitEaseData = function (gameObject, easeData) {
    // Route 'complete' of easeData to gameObject
    easeData.on('complete', function (key) {
        gameObject.emit(`easedata.${key}.complete`, gameObject);
        gameObject.emit('easedata.complete', key, gameObject);
    })
}

export default {
    easeDataTo(key, value, duration, ease) {
        if (!this._easeData) {
            this._easeData = new EaseData(this);
            OnInitEaseData(this, this._easeData);
        }
        this._easeData.easeTo(key, value, duration, ease);
        return this;
    },

    easeDataToPromise(key, value, duration, ease) {
        this.easeDataTo(key, value, duration, ease);
        return WaitEvent(this._easeData, `complete-${key}`);
    },

    stopEaseData(key, toEnd) {
        if (!this._easeData) {
            return this;
        }

        this._easeData.stopEase(key, toEnd);
        return this;
    },

    stopAllEaseData(toEnd) {
        if (!this._easeData) {
            return this;
        }

        this._easeData.stopAll(toEnd);
        return this;
    }
}