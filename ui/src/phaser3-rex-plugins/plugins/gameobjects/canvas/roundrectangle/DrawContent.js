import DrawRoundRectangleBackground from '../utils/DrawRoundRectangleBackground.js';

var DrawContent = function () {
    DrawRoundRectangleBackground(
        this,
        this.fillStyle,
        this.strokeStyle,
        this.lineWidth,
        this.radius,
        this.fillColor2,
        this.isHorizontalGradient,
        this.iteration
    );
}

export default DrawContent;