import Delaunay from './delaunay.js';

const Triangle = Phaser.Geom.Triangle;

var Triangulate = function (vertices, triangleResult) {
    if (triangleResult === undefined) {
        triangleResult = true;
    }

    var indices = Delaunay.triangulate(vertices);
    if (triangleResult) {
        var triangles = [];
        for (var i = 0, cnt = indices.length; i < cnt; i += 3) {
            var p0 = vertices[indices[i + 0]];
            var p1 = vertices[indices[i + 1]];
            var p2 = vertices[indices[i + 2]];
            var triangle = new Triangle(p0[0], p0[1], p1[0], p1[1], p2[0], p2[1]);
            triangles.push(triangle);
        }
        return triangles;
    } else {
        return {
            vertices: vertices,
            indices: indices
        }
    }
}

export default Triangulate;