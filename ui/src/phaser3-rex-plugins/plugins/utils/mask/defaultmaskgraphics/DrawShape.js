var DrawShape = function (width, height, padding, originX, originY) {
    this.clear().fillStyle(0xffffff);
    switch (this.shape) {
        case 1: // circle
            var radius = Math.min(width, height) / 2;
            this.fillCircle(
                -width * (originX - 0.5),
                -height * (originY - 0.5),
                radius + padding
            );
            break;
        default: // 0|'rectangle'
            this.fillRect(
                -(width * originX) - padding,
                -(height * originY) - padding,
                width + (2 * padding),
                height + (2 * padding)
            );
            break;
    }
}

export default DrawShape;