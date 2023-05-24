var SetIgnoreNextPageInput = function (enable) {
    if (enable === undefined) {
        enable = true;
    }
    this.ignoreNextPageInput = enable;
    return this;
}

export default SetIgnoreNextPageInput;