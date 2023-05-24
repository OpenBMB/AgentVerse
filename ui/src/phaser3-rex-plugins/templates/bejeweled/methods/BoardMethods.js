export default {
    setBoardSize(width, height) {
        this.board.setBoardWidth(width).setBoardHeight(height);
        return this;
    },

    // Chess properties
    getChessMoveTo(chess) {
        return (chess) ? chess.rexMoveTo : undefined;
    },

    getChessTileZ() {
        return this.board.chessTileZ;
    },

    worldXYToChess(worldX, worldY) {
        return this.board.worldXYToChess(worldX, worldY);
    },

    tileXYToChess(tileX, tileY) {
        return this.board.tileXYToChess(tileX, tileY);
    },

    getNeighborChessAtAngle(chess, angle) {
        return this.board.getNeighborChessAtAngle(chess, angle);
    },

    getNeighborChessAtDirection(chess, direction) {
        return this.board.getNeighborChessAtDirection(chess, direction);
    },

    // Expose board instance
    getBoard() {
        return this.board.board;
    },

    // Expose match instance
    getMatch() {
        return this.board.match;
    }
}