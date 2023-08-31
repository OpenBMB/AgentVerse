var SetIgnoreWait = function (value) {
    if (value === undefined) {
        value = true;
    }
    this.ignoreWait = value;
    return this;
}

export default SetIgnoreWait;