export default {
    setScanlinesEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.scanlinesEnable = enable;
        return this;
    },

    setScanStrength(value) {
        this.scanStrength = value;
        return this;
    },
}