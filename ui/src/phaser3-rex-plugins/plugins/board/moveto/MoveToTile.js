import GetValue from '../../utils/object/GetValue.js';
import GetSneakTileZ from './GetSneakTileZ.js';

var MoveToTile = function (tileX, tileY, direction) {
    var board = this.chessData.board;
    if (board === null) { // chess is not in a board
        this.lastMoveResult = false;
        return this;
    }

    if ((tileX != null) && (typeof (tileX) !== 'number')) {
        var config = tileX;
        tileX = GetValue(config, 'x', undefined);
        tileY = GetValue(config, 'y', undefined);
        direction = GetValue(config, 'direction', undefined);
    }
    var myTileXYZ = this.chessData.tileXYZ;
    if ((direction !== undefined) &&
        (tileX == null) || (tileY == null)) {
        // Get neighbor tile position if direction is not undefined
        var targetTileXY = board.getNeighborTileXY(myTileXYZ, direction, true);
        if (targetTileXY !== null) {
            tileX = targetTileXY.x;
            tileY = targetTileXY.y;
        } else {
            tileX = null;
            tileY = null;
        }
    }

    // invalid tile position
    if ((tileX == null) || (tileY == null)) {
        this.lastMoveResult = false;
        return this;
    }
    if (direction === undefined) {
        globTileXYZ.x = tileX;
        globTileXYZ.y = tileY
        direction = board.getNeighborTileDirection(myTileXYZ, globTileXYZ);
    }
    if (!this.canMoveTo(tileX, tileY, direction)) {
        this.lastMoveResult = false;
        return this;
    }
    this.destinationTileX = tileX;
    this.destinationTileY = tileY;
    this.destinationDirection = direction;

    if (board.wrapMode && (direction !== null)) {
        board.grid.getNeighborTileXY(myTileXYZ.x, myTileXYZ.y, direction, neighborTileXY);
        // wrap mode && neighbor
        if ((neighborTileXY.x === tileX) && (neighborTileXY.y === tileY)) {
            // not a wrapped neighbor
            var out = board.tileXYToWorldXY(tileX, tileY, true);
            this.moveAlongLine(undefined, undefined, out.x, out.y);
        } else {
            // wrapped neighbor
            // line 0
            var out = board.tileXYToWorldXY(neighborTileXY.x, neighborTileXY.y, true);
            var originNeighborWorldX = out.x;
            var originNeighborWorldY = out.y;
            out = board.tileXYToWorldXY(myTileXYZ.x, myTileXYZ.y, true);
            var startX = out.x;
            var startY = out.y;
            var endX = (startX + originNeighborWorldX) / 2;
            var endY = (startY + originNeighborWorldY) / 2;
            this.moveAlongLine(undefined, undefined, endX, endY);
            // line 1
            var oppositeDirection = board.getOppositeDirection(tileX, tileY, direction);
            board.grid.getNeighborTileXY(tileX, tileY, oppositeDirection, neighborTileXY);
            out = board.tileXYToWorldXY(neighborTileXY.x, neighborTileXY.y, true);
            originNeighborWorldX = out.x;
            originNeighborWorldY = out.y;
            out = board.tileXYToWorldXY(tileX, tileY, true);
            endX = out.x;
            endY = out.y;
            startX = (originNeighborWorldX + endX) / 2;
            startY = (originNeighborWorldY + endY) / 2;
            this.addMoveLine(startX, startY, endX, endY);
        }
    } else {
        var out = board.tileXYToWorldXY(tileX, tileY, true);
        this.moveAlongLine(undefined, undefined, out.x, out.y);
    }

    var tileZ = myTileXYZ.z;
    if (this.sneakMode) {
        if (this.tileZSave === undefined) {
            if (board.contains(tileX, tileY, tileZ)) {
                // Sneak
                this.tileZSave = tileZ;
                tileZ = GetSneakTileZ(this, tileX, tileY, this.tileZSave);
            }
        } else {
            if (board.contains(tileX, tileY, this.tileZSave)) {
                // Sneak
                tileZ = GetSneakTileZ(this, tileX, tileY, this.tileZSave);
            } else {
                // Go back
                tileZ = this.tileZSave;
                this.tileZSave = undefined;
            }
        }
    }
    board.moveChess(this.parent, tileX, tileY, tileZ, false);

    this.isRunning = true;
    this.lastMoveResult = true;
    return this;
}

var globTileXYZ = {};
var neighborTileXY = {};

export default MoveToTile;