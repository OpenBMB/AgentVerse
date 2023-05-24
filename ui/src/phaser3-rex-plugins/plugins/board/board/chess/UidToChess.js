import ChessBank from '../../chess/ChessBank.js';

var UidToChess = function (uid) {
    if (uid == null) {
        return null;
    } else {
        if (!this.boardData.exists(uid)) {
            return null;
        }
        return ChessBank.get(uid).parent;
    }
}
export default UidToChess;