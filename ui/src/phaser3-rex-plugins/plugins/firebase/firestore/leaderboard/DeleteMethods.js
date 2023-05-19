import Delete from '../utils/query/Delete.js';

var Methods = {
    deleteUser(userID) {
        if (userID === undefined) {
            userID = this.userID;
        }

        var query = this.getRecordQuery(undefined, undefined, userID, undefined);
        return Delete(query);
    },

    deleteBoard(boardID, tag) {
        if (boardID === undefined) {
            boardID = this.boardID;
        }
        if (tag === undefined) {
            tag = this.tag;
        }

        var query = this.getRecordQuery(boardID, tag, undefined, undefined);
        return Delete(query);
    }
}
export default Methods;