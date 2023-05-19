import DrawBounds from '../../../bounds/DrawBounds.js';

var DrawGameObjectsBounds = function (graphics, config) {
    this.forEachGO(function (gameObject) {
        if (gameObject.drawBounds) {
            gameObject.drawBounds(graphics, config);
        } else {
            DrawBounds(gameObject, graphics, config);
        }
    });
    return this;
}

export default DrawGameObjectsBounds;