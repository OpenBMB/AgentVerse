import {
    GetTopLeft, GetTopRight,
    GetBottomLeft, GetBottomRight
} from './GetBounds.js';

const Polygon = Phaser.Geom.Polygon;

var BoundsToPolygon = function (gameObject, out) {
    if (out === undefined) {
        out = new Polygon();
    }
    var p0 = GetTopLeft(gameObject),
        p1 = GetTopRight(gameObject),
        p2 = GetBottomRight(gameObject),
        p3 = GetBottomLeft(gameObject);
    out.setTo([p0, p1, p2, p3, p0]);
    return out;
}

export default BoundsToPolygon;