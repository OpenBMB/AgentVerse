import AlignIn from '../../../../plugins/utils/actions/AlignIn.js';

var LayoutChild = function (child, x, y, width, height, align, offsetX, offsetY) {
    AlignIn(child, x, y, width, height, align);

    if (offsetX !== undefined) {
        child.x += offsetX;
    }
    if (offsetY !== undefined) {
        child.y += offsetY;
    }

    this.resetChildPositionState(child);

    if (this.sizerEventsEnable) {
        child.emit('sizer.postlayout', child, this);
    }
}

export default LayoutChild;