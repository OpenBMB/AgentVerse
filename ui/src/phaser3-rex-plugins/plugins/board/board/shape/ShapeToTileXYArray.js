var ShapeToTileXYArray = function (shape, config, out) {
    if (typeof (config) === 'number') {
        config = {
            testMode: config
        }
    }

    if (Array.isArray(config)) {
        out = config;
        config = undefined;
    }

    if (out === undefined) {
        out = [];
    }

    this.forEachTileXYInShape(
        shape,
        function (tileXY) {
            out.push({ x: tileXY.x, y: tileXY.y });
        },
        undefined,
        config
    );

    return out;
};

export default ShapeToTileXYArray;