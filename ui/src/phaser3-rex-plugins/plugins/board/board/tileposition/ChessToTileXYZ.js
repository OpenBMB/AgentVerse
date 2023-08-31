import IsUID from '../../chess/IsUID.js';
import IsChess from '../../chess/IsChess';
import GetChessUID from '../../chess/GetChessUID.js';
import IsTileXYZ from '../../utils/IsTileXYZ.js';

var ChessToTileXYZ = function (chess) {
    if (!chess) {
        return null;
    }

    // chess: chess object, UID, or tileXYZ
    if (IsUID(chess) || IsChess(chess)) { // UID, or game object
        var uid = GetChessUID(chess);
        return this.boardData.getXYZ(uid);
    } else if (IsTileXYZ(chess)) { // {x, y}, or {x, y, z}
        return chess;
    } else {
        return null;
    }
}
export default ChessToTileXYZ;