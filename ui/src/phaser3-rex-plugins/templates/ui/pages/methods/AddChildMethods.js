import OverlapSizer from '../../overlapsizer/OverlapSizer.js';

const OverlapSizerAdd = OverlapSizer.prototype.add;

var Add = function (gameObject, childKey, align, padding, expand, minWidth, minHeight, offsetX, offsetY) {
    gameObject.setVisible(false); // Default is invisible
    OverlapSizerAdd.call(this, gameObject, childKey, align, padding, expand, minWidth, minHeight, offsetX, offsetY)
    return this;
}

export default {
    add: Add,
    addPage: Add
}