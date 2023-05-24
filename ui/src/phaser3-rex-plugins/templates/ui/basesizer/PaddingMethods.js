import { GetPadding, SetPadding } from '../../../plugins/utils/padding/PaddingMethods.js';

export default {
    getInnerPadding(key) {
        return GetPadding(this.space, key);
    },

    setInnerPadding(key, value) {
        SetPadding(this.space, key, value);
        return this;
    },

    getOuterPadding(key) {
        return GetPadding(this.getSizerConfig(this).padding, key);
    },

    setOuterPadding(key, value) {
        SetPadding(this.getSizerConfig(this).padding, key, value);
        return this;
    },

    getChildOuterPadding(child, key) {
        if (typeof (child) === 'string') {
            child = this.getElement(child);
        }
        return GetPadding(this.getSizerConfig(child).padding, key);
    },

    setChildOuterPadding(child, key, value) {
        if (typeof (child) === 'string') {
            child = this.getElement(child);
        }
        SetPadding(this.getSizerConfig(child).padding, key, value);
        return this;
    },
}