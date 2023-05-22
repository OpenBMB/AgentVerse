import GetFrameNameCallback from "./GetFrameNameCallback";

var GridCut = function (scene, key, frame, columns, rows, getFrameNameCallback) {
    if (frame == null) {
        frame = '__BASE';
    }

    if (!getFrameNameCallback) {
        getFrameNameCallback = GetFrameNameCallback(frame, getFrameNameCallback);
    }

    var texture = scene.sys.textures.get(key);
    var baseFrame = (typeof (frame) === 'object') ? frame : texture.get(frame);

    var baseWidth = baseFrame.width,
        baseHeight = baseFrame.height;

    var cellX, cellY, cellName;
    var cellWidth = baseWidth / columns,
        cellHeight = baseHeight / rows;

    var offsetX = 0,
        offsetY = 0;
    for (var y = 0; y < rows; y++) {
        offsetX = 0;
        for (var x = 0; x < columns; x++) {
            cellName = getFrameNameCallback(x, y);

            cellX = offsetX + baseFrame.cutX;
            cellY = offsetY + baseFrame.cutY;

            texture.add(
                cellName, 0,
                cellX, cellY,
                cellWidth, cellHeight
            );

            offsetX += cellWidth;
        }
        offsetY += cellHeight;
    }

    return {
        getFrameNameCallback: getFrameNameCallback,
        cellWidth: cellWidth,
        cellHeight: cellHeight,
        columns: columns,
        rows: rows
    }
}

export default GridCut;