export default {
    setBloomEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.bloomEnable = enable;
        return this;
    },

    setBloomRadius(value) {
        this.bloomRadius = value;
        return this;
    },

    setBloomIntensity(value) {
        this.bloomIntensity = value;
        return this;
    },

    setBloomThreshold(value) {
        this.bloomThreshold = value;
        return this;
    },

    setBloomTexelSize(width, height) {
        if (height === undefined) {
            height = width;
        }
        this.bloomTexelWidth = width;
        this.bloomTexelHeight = height;
        return this;
    }


}