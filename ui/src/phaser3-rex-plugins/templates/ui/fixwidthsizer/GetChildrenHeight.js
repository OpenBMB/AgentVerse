var GetChildrenHeight = function () {
    if (this.rexSizer.hidden) {
        return 0;
    }

    // After RunChildrenWrap
    return this.widthWrapResult.height + this.space.top + this.space.bottom;
}

export default GetChildrenHeight;