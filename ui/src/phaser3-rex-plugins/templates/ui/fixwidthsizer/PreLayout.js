import PreLayoutBase from '../basesizer/PreLayout.js';

var PreLayout = function () {
    this._maxChildWidth = undefined;
    this._maxChildHeight = undefined;
    PreLayoutBase.call(this);
    return this;
}
export default PreLayout;