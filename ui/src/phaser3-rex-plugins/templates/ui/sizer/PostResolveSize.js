import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';

var PostResolveSize = function (width, height) {
    if (this.hasRatioFitChild) {
        // Resize child for ratio-fit 
        var innerHeight, innerWidth;
        if (this.orientation === 0) {
            innerHeight = height - this.getInnerPadding('top') - this.getInnerPadding('bottom');
        } else {
            innerWidth = width - this.getInnerPadding('left') - this.getInnerPadding('right');
        }

        var children = this.sizerChildren,
            childWidth, childHeight;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (child.rexSizer.hidden) {
                continue;
            }

            var fitRatio = child.rexSizer.fitRatio;
            if (!fitRatio) {
                continue;
            }

            if (this.orientation === 0) {
                childHeight = innerHeight - this.getChildOuterPadding(child, 'top') - this.getChildOuterPadding(child, 'bottom');
                childWidth = childHeight * fitRatio;
            } else {
                childWidth = innerHeight - this.getChildOuterPadding(child, 'top') - this.getChildOuterPadding(child, 'bottom');
                childHeight = childWidth / fitRatio;
            }

            ResizeGameObject(child, childWidth, childHeight);
            if (child.isRexSizer) {
                child.setMinSize(childWidth, childHeight)
            }
        }

        this.proportionLength = undefined;
        this._childrenWidth = undefined;
        this.resolveWidth(width, true);
    }
}

export default PostResolveSize;