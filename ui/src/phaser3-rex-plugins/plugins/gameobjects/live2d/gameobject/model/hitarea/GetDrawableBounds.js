import HitAreaNameToDrawIndex from './HitAreaNameToDrawIndex.js';

const Rectangle = Phaser.Geom.Rectangle;

var GetDrawableBounds = function (index, bounds) {
    if (bounds === undefined) {
        bounds = new Rectangle();
    } else if (bounds === true) {
        if (GlobRect === undefined) {
            GlobRect = new Rectangle;
        }
        bounds = GlobRect;
    }

    if (typeof (index) === 'string') {
        index = HitAreaNameToDrawIndex.call(this, index);
        if (index === undefined) {
            return null;
        }
    }

    var count = this._model.getDrawableVertexCount(index) * 2;
    var vertices = this._model.getDrawableVertices(index);

    var left = Infinity,
        right = -Infinity,
        top = Infinity,
        bottom = -Infinity;

    for (var i = 0; i < count; i += 2) {
        var x = vertices[i];
        var y = vertices[i + 1];

        left = Math.min(left, x);
        right = Math.max(right, x);
        top = Math.min(top, y);
        bottom = Math.max(bottom, y);
    }

    bounds.setTo(left, top, (right - left), (bottom - top));

    return bounds;
}

var GlobRect;

export default GetDrawableBounds;