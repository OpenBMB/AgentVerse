var SetEnable = function (enable) {
    if (enable === undefined) {
        enable = true;
    }
    this.bloomEnable = enable;
    this.chromaticEnable = enable;
    this.vignetteEnable = enable;
    this.noiseEnable = enable;
    this.vhsEnable = enable;
    this.scanlinesEnable = enable;
    this.crtEnable = enable;

    return this;
}

export default SetEnable;