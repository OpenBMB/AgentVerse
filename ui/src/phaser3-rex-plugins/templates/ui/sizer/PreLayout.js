import PreLayoutBase from '../basesizer/PreLayout.js';
import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';

var PreLayout = function () {
    // Resize child to 1x1 for ratio-fit 
    this.hasRatioFitChild = false;
    var children = this.sizerChildren;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (child.rexSizer.hidden) {
            continue;
        }
        if (!child.rexSizer.fitRatio) {
            continue;
        }

        ResizeGameObject(child, 1, 1);
        this.hasRatioFitChild = true;
    }

    this._childrenProportion = undefined;
    this.proportionLength = undefined;
    PreLayoutBase.call(this);
    return this;
}
export default PreLayout;