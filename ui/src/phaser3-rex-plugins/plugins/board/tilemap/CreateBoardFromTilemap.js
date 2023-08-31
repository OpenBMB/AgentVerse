import CreateBoard from './CreateBoard.js';
import AddLayers from './AddLayers.js';

var CreateBoardFromTilemap = function (tilemap, layers) {
    var board = CreateBoard(tilemap);
    AddLayers(board, tilemap, layers);
    return board;
}

export default CreateBoardFromTilemap;