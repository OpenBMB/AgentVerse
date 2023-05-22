import ControlPoint from './ControlPoint.js';

const Vertex = Phaser.Geom.Mesh.Vertex;
const Face = Phaser.Geom.Mesh.Face;

var InitFaces = function (quad) {
    var isNinePointMode = quad.isNinePointMode;
    var pointCount = (isNinePointMode) ? 9 : 4;

    var vertices = quad.vertices;
    var faces = quad.faces;
    var controlPoints = quad.controlPoints;
    for (var i = 0; i < pointCount; i++) {
        var vertex = new Vertex();
        vertices.push(vertex);
        controlPoints.push(new ControlPoint(quad, vertex));
    }
    var indices;
    if (isNinePointMode) {
        indices = NinePointsIndices;
    } else {
        if (!quad.fourPointsModeRTL) {
            indices = FourPointsIndices;
        } else {
            indices = FourPointsIndicesRTL;
        }
    }

    for (var i = 0, cnt = indices.length; i < cnt; i += 3) {
        var vert1 = vertices[indices[i + 0]];
        var vert2 = vertices[indices[i + 1]];
        var vert3 = vertices[indices[i + 2]];
        faces.push(new Face(vert1, vert2, vert3));
    }

    if (isNinePointMode) {
        quad.topLeft = controlPoints[0];
        quad.topCenter = controlPoints[1];
        quad.topRight = controlPoints[2];
        quad.centerLeft = controlPoints[3];
        quad.center = controlPoints[4];
        quad.centerRight = controlPoints[5];
        quad.bottomLeft = controlPoints[6];
        quad.bottomCenter = controlPoints[7];
        quad.bottomRight = controlPoints[8];
    } else {
        quad.topLeft = controlPoints[0];
        quad.topRight = controlPoints[1];
        quad.bottomLeft = controlPoints[2];
        quad.bottomRight = controlPoints[3];
    }
}

/*
0, 1,
2, 3,
*/
const FourPointsIndices = [
    0, 2, 3,
    0, 3, 1
];

const FourPointsIndicesRTL = [
    1, 3, 2,
    1, 2, 0
];


/*
0, 1, 2,
3, 4, 5,
6, 7, 8
*/
const NinePointsIndices = [
    0, 3, 4,
    0, 4, 1,
    1, 4, 2,
    4, 5, 2,
    3, 6, 4,
    6, 7, 4,
    4, 7, 8,
    4, 8, 5
];

export default InitFaces;