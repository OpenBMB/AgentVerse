/*
1. Fill empty grids
*/

var Fill = function (map) {
    var upperBoard = false;
    if (typeof (map) === 'boolean') {
        upperBoard = map;
        map = undefined;
    }

    var symbol;
    var board = this.board,
        symbols = this.candidateSymbols;

    var height = this.board.height;
    if (upperBoard) {
        height /= 2;
    }
    for (var tileY = 0; tileY < height; tileY++) {
        for (var tileX = 0, width = this.board.width; tileX < width; tileX++) {
            if (board.contains(tileX, tileY, this.chessTileZ)) { // not empty                
                continue;
            }

            if (map !== undefined) {
                symbol = map[tileX][tileY];
                if (symbol !== '?') {
                    symbols = symbol;
                }
            }
            this.createChess(tileX, tileY, symbols);
        }
    }
}
export default Fill;