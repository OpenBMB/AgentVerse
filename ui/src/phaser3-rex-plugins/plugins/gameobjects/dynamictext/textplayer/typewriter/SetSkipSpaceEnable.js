var SetSkipSpaceEnable = function (enable) {
    if (enable === undefined) {
        enable = true;
    }
    this.skipSpaceEnable = enable;
    return this;
}

export default SetSkipSpaceEnable;