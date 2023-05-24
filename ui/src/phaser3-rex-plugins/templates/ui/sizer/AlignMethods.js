import ALIGNMODE from '../utils/AlignConst.js';

export default {
    getChildAlign(gameObject) {
        return this.getSizerConfig(gameObject).align;
    },

    setChildAlign(gameObject, align) {
        if (typeof (align) === 'string') {
            align = ALIGNMODE[align];
        }

        this.getSizerConfig(gameObject).align = align;
        return this;
    },

}