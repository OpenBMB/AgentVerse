//import Polygon from '../../utils/geom/polygon/Polygon.js';

const Polygon = Phaser.Geom.Polygon;

var ToPolygon = function (pathData, polygon) {
    if (polygon === undefined) {
        polygon = new Polygon();
    }
    polygon.setTo(pathData);
    return polygon;
}

export default ToPolygon;