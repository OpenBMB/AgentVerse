import ChessBank from './ChessBank.js';
import ChessData from './ChessData.js';
import IsUID from './IsUID';

var GetChessData = function (gameObject) {
    // game object or uid
    if (IsUID(gameObject)) {
        // uid
        return ChessBank.get(gameObject);
    } else {
        // game object
        if (!gameObject.hasOwnProperty('rexChess')) {
            gameObject.rexChess = new ChessData(gameObject);
        }
        return gameObject.rexChess;
    }
}
export default GetChessData;