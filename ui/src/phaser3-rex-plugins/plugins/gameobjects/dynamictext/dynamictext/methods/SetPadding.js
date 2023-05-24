import { SetPadding as SetPaddingBase } from '../../../../utils/padding/PaddingMethods.js';

var SetPadding = function (key, value) {
    var padding = this.padding;
    var paddingLeft = padding.left,
        paddingRight = padding.right,
        paddingTop = padding.top,
        paddingBottom = padding.bottom;

    SetPaddingBase(padding, key, value);

    this.dirty = this.dirty ||
        (paddingLeft != padding.left) ||
        (paddingRight != padding.right) ||
        (paddingTop != padding.top) ||
        (paddingBottom != padding.bottom)
        ;
    return this;
};

export default SetPadding;