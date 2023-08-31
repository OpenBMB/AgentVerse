var SetWrapConfig = function (config) {
    if (config === undefined) {
        config = {};
    }

    this.wrapConfig = config;
    return this;
}

export default SetWrapConfig;