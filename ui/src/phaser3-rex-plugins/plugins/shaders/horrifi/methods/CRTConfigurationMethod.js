export default {
    setCRTEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.crtEnable = enable;
        return this;
    },

    setCrtSize(width, height) {
        if (height === undefined) {
            height = width;
        }
        this.crtWidth = width;
        this.crtHeight = height;
        return this;
    },
}