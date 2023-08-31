export default {
    // Override
    renderContent() {

    },

    // Override
    render() {
        if (!this.willRender) {
            return this;
        }

        var context = this.context;
        context.save();
        context.globalAlpha = this.alpha;

        if (this.toLocalPosition) {
            var x = this.drawX, y = this.drawY;
            if (this.autoRound) {
                x = Math.round(x);
                y = Math.round(y);
            }

            context.translate(x, y);
            context.scale(this.scaleX, this.scaleY);
            context.rotate(this.rotation);
        }

        if (this.drawBelowCallback) {
            this.drawBelowCallback(this);
        }

        this.renderContent();

        if (this.drawAboveCallback) {
            this.drawAboveCallback(this);
        }

        context.restore();

        return this;
    },
}
