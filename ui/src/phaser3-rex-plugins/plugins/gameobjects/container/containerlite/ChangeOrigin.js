import ChangeOriginBase from '../../../utils/origin/ChangeOrigin.js';

var ChangeOrigin = function (originX, originY) {
    this.syncChildrenEnable = false;
    ChangeOriginBase(this, originX, originY);
    this.syncChildrenEnable = true;

    var children = this.getAllChildren();
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        this.resetChildPositionState(children[i]);
    }
    return this;
}

export default ChangeOrigin;