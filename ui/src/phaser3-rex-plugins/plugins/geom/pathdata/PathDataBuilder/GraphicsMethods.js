export default {
    draw(graphics, isFill, isStroke) {
        var points = this.toPoints();
        if (isFill) {
            graphics.fillPoints(points, this.closePath, this.closePath);
        }
        if (isStroke) {
            graphics.strokePoints(points, this.closePath, this.closePath);
        }

        return this;
    }
}