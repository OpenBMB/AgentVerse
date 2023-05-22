import { TimeTagKeys, ScoreKeys } from './Const.js';
import GetTime from './GetTime.js';

var Methods = {
    getRecordQuery(boardID, customTag, userID, timeTagKey) {
        var query = this.rootRef;
        query = (boardID !== undefined) ? query.where('boardID', '==', boardID) : query;
        query = (customTag !== undefined) ? query.where('tag', '==', customTag) : query;
        query = (userID !== undefined) ? query.where('userID', '==', userID) : query;

        if (timeTagKey !== undefined) {
            query = query.where(timeTagKey[0], '==', timeTagKey[1]);
        }
        return query;
    },

    getMyRecordQuery(userID) {        
        if (userID === undefined) {
            userID = this.userID;
        }
        return this.getRecordQuery(this.boardID, this.tag, userID, undefined).limit(1);
    },

    getPageQuery() {
        var timeTagKey, scoreKey;
        if (this.timeFilters !== false) {
            var t = this.timeFilterType[0];
            timeTagKey = [TimeTagKeys[t], GetTime()[t]];
            scoreKey = ScoreKeys[t];
        } else { // No time filters
            timeTagKey = undefined;
            scoreKey = 'score';
        }

        var baseQuery = this.getRecordQuery(this.boardID, this.tag, undefined, timeTagKey);
        var nextPageQuery = baseQuery.orderBy(scoreKey, 'desc');
        var prevPageQuery = baseQuery.orderBy(scoreKey);
        return {
            next: nextPageQuery,
            previous: prevPageQuery
        }
    }
}

export default Methods;