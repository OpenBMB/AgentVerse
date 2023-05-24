export default {
    setBackgroundColor(color, color2, isHorizontalGradient) {
        this.background.setColor(color, color2, isHorizontalGradient);
        return this;
    },

    setBackgroundStroke(color, lineWidth) {
        this.background.setStroke(color, lineWidth);
        return this;
    },

    setBackgroundCornerRadius(radius, iteration) {
        this.background.setCornerRadius(radius, iteration);
        return this;
    }
}