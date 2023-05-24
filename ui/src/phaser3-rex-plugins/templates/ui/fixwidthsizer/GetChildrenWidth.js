var GetChildrenWidth = function () {
    if (this.rexSizer.hidden) {
        return 0;
    }

    // Before RunChildrenWrap
    return this.maxChildWidth + this.space.left + this.space.right;
}

export default GetChildrenWidth;