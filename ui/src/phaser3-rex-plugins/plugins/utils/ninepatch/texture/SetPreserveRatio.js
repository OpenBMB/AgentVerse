var SetPreserveRatio = function (enable) {
    if (enable == undefined) {
        enable = true;
    }

    this.preserveRatio = enable;
    return this;
}

export default SetPreserveRatio;