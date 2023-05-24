import GetChessData from './GetChessData.js';
import ChessBank from './ChessBank.js';
import IsUID from './IsUID.js';

const uidKey = ChessBank.uidKey;
var GetChessUID = function (gameObject) {
    // Game object or uid
    var uid;
    if (IsUID(gameObject)) {
        uid = gameObject;
    } else {
        uid = GetChessData(gameObject)[uidKey];
    }
    return uid;
}
export default GetChessUID;