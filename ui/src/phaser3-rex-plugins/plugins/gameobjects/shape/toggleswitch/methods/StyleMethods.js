export default {
    setTrackFillStyle(color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }
        this.dirty = this.dirty ||
            (this.trackFillColor !== color) ||
            (this.trackFillAlpha !== alpha);

        this.trackFillColor = color;
        this.trackFillAlpha = alpha;
        return this;
    },

    setFalseValueTrackFillStyle(color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }
        this.dirty = this.dirty ||
            (this.falseValueTrackColor !== color) ||
            (this.uncheckedTrackFillAlpha !== alpha);

        this.falseValueTrackColor = color;
        this.falseValueTrackFillAlpha = alpha;
        return this;
    },

    setThumbStyle(color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }
        this.dirty = this.dirty ||
            (this.thumbColor !== color) ||
            (this.checkAlpha !== alpha);

        this.thumbColor = color;
        this.thumbAlpha = alpha;
        return this;
    },

}