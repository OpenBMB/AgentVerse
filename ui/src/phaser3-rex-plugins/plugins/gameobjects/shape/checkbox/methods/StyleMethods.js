export default {
    setBoxFillStyle(color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }
        this.dirty = this.dirty ||
            (this.boxFillColor !== color) ||
            (this.boxFillAlpha !== alpha);

        this.boxFillColor = color;
        this.boxFillAlpha = alpha;
        return this;
    },

    setUncheckedBoxFillStyle(color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }
        this.dirty = this.dirty ||
            (this.uncheckedBoxFillColor !== color) ||
            (this.uncheckedBoxFillAlpha !== alpha);

        this.uncheckedBoxFillColor = color;
        this.uncheckedBoxFillAlpha = alpha;
        return this;
    },

    setBoxStrokeStyle(lineWidth, color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }
        this.dirty = this.dirty ||
            (this.boxLineWidth !== lineWidth) ||
            (this.boxStrokeColor !== color) ||
            (this.boxStrokeAlpha !== alpha);

        this.boxLineWidth = lineWidth;
        this.boxStrokeColor = color;
        this.boxStrokeAlpha = alpha;
        return this;
    },

    setUncheckedBoxStrokeStyle(lineWidth, color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }
        this.dirty = this.dirty ||
            (this.uncheckedBoxLineWidth !== lineWidth) ||
            (this.uncheckedBoxStrokeColor !== color) ||
            (this.uncheckedBoxStrokeAlpha !== alpha);

        this.uncheckedBoxLineWidth = lineWidth;
        this.uncheckedBoxStrokeColor = color;
        this.uncheckedBoxStrokeAlpha = alpha;
        return this;
    },

    setCheckerStyle(color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }
        this.dirty = this.dirty ||
            (this.checkerColor !== color) ||
            (this.checkAlpha !== alpha);

        this.checkerColor = color;
        this.checkAlpha = alpha;
        return this;
    },

    setBoxShape(isCircleShape) {
        if (isCircleShape === undefined) {
            isCircleShape = false;
        }
        if (this.isCircleShape === isCircleShape) {
            return this;
        }

        this.isCircleShape = isCircleShape;
        this.isSizeChanged = true;
        this.dirty = true;
        return this;
    }
}