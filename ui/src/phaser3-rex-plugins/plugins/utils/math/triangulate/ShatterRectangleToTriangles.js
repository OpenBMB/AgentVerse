import Triangulate from './Triangulate.js';
import IsFunction from '../../object/IsFunction.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;
const DefaultRingRadiusList = [1 / 27, 3 / 27, 9 / 27];

var ShatterRectangleToTriangles = function (config) {
    var left, right, top, bottom, width, height;
    var rectangle = config.rectangle;
    if (rectangle) {
        left = rectangle.x;
        top = rectangle.y;
        width = rectangle.width;
        height = rectangle.height;
    } else {
        left = 0;
        top = 0;
        width = config.width;
        height = config.height;
    }
    right = left + width;
    bottom = top + height;

    var center = config.center;
    var centerX, centerY;
    if (center === undefined) {
        centerX = (left + right) / 2;
        centerY = (top + bottom) / 2;
    } else {
        centerX = Clamp(center.x, left, right);
        centerY = Clamp(center.y, top, bottom);
    }

    var ringRadiusList = GetValue(config, 'ringRadiusList', DefaultRingRadiusList);
    var ringSamples = GetValue(config, 'samplesPerRing', 12);
    var variation = GetValue(config, 'variation', 0.25);
    var triangleOutput = GetValue(config, 'triangleOutput', true);

    if (IsFunction(ringRadiusList)) {
        ringRadiusList = ringRadiusList(width, height);
    }

    var randMin = 1 - variation,
        randMax = 1 + variation;

    for (var i = 0; i < 10; i++) {
        // Can generate triangles 10 times
        try {
            var vertices = GenerateVertices(
                centerX, centerY,
                width, height, ringRadiusList, ringSamples,
                randMin, randMax,
                left, right, top, bottom
            )
            return Triangulate(vertices, triangleOutput);
        } catch (e) {

        }
    }

    throw new Error("Generate triangles fail");
}

var GenerateVertices = function (
    centerX, centerY,
    width, height, ringRadiusList, ringSamples,
    randMin, randMax,
    left, right, top, bottom
) {
    var vertices = [];
    vertices.push([centerX, centerY]);

    var radius = Math.min(width, height);
    for (var i = 0, cnt = ringRadiusList.length; i < cnt; i++) {
        AddRingVertices(
            vertices,
            centerX, centerY, (radius * ringRadiusList[i]), ringSamples,
            randMin, randMax,
            left, right, top, bottom
        )
    }

    // Vertices outside of rectangle
    var radius = Math.max(width, height) * 2;
    AddRingVertices(
        vertices,
        centerX, centerY, radius, ringSamples,
        randMin, randMax,
        left, right, top, bottom
    )

    return vertices;
}

const TWO_PI = Math.PI * 2;
var AddRingVertices = function (
    vertices,
    centerX, centerY, radius, amount,
    randMin, randMax,
    leftBound, rightBound, topBound, bottomBound
) {
    for (var i = 0; i < amount; i++) {
        var rad = (i / amount) * TWO_PI;
        var x = centerX + Math.cos(rad) * radius * RandomRange(randMin, randMax);
        var y = centerY + Math.sin(rad) * radius * RandomRange(randMin, randMax);
        x = Clamp(x, leftBound, rightBound);
        y = Clamp(y, topBound, bottomBound);
        vertices.push([x, y]);
    }
    return vertices;
}

var RandomRange = function (min, max) {
    if (min === max) {
        return min;
    } else {
        return min + (max - min) * Math.random();
    }
}

export default ShatterRectangleToTriangles;