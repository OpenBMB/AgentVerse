export default {
    setInnerBoundsColor(color, color2, isHorizontalGradient) {
        this.innerBounds.setColor(color, color2, isHorizontalGradient);
        return this;
    },

    setInnerBoundsStroke(color, lineWidth) {
        this.innerBounds.setStroke(color, lineWidth);
        return this;
    },
}