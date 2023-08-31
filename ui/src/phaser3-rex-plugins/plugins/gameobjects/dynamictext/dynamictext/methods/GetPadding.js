import { GetPadding as GetPaddingBase } from '../../../../utils/padding/PaddingMethods.js';

var GetPadding = function (key) {
    return GetPaddingBase(this.padding, key);
}

export default GetPadding;