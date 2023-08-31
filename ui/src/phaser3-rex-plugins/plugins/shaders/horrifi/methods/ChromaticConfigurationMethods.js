export default {
    setChromaticEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.chromaticEnable = enable;
        return this;
    },

    setChabIntensity(value) {
        this.chabIntensity = value;
        return this;
    },
}