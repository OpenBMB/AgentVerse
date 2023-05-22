import CreatePolygonTexture from '../../utils/texture/CreatePolygonTexture.js';

var CreateTileTexture = function (board, key, fillStyle, strokeStyle, lineWidth, overlapGrid, lineJoin) {
    if (typeof (overlapGrid) === 'string') {
        lineJoin = overlapGrid;
        overlapGrid = undefined;
    }

    if (overlapGrid === undefined) {
        overlapGrid = true;
    }
    if (lineJoin === undefined) {
        lineJoin = 'miter';
    }

    CreatePolygonTexture(
        board.scene,
        key,
        board.getGridPoints(0, 0, true),
        fillStyle,
        strokeStyle, lineWidth,
        overlapGrid,
        lineJoin
    );
}

export default CreateTileTexture;