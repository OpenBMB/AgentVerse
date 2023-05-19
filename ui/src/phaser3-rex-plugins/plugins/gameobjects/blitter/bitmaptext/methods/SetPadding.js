import { SetPadding as SetPaddingBase } from '../../../../utils/padding/PaddingMethods.js';

var SetPadding = function (key, value) {
    SetPaddingBase(this.padding, key, value);

    return this;
};

export default SetPadding;