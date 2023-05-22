export default {
    setVignetteEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.vignetteEnable = enable;
        return this;
    },

    setVignetteStrength(value) {
        this.vignetteStrength = value;
        return this;
    },

    setVignetteIntensity(value) {
        this.vignetteIntensity = value;
        return this;
    }
}