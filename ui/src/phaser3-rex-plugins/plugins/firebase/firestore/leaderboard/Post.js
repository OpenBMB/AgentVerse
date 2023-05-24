import GetTime from './GetTime.js';
import { TimeTagKeys, ScoreKeys } from './Const.js';

var Post = function (score, extraData, timeStamp) {
    var newRecord = {
        userID: this.userID
    };
    if (this.boardID !== undefined) {
        newRecord.boardID = this.boardID;
    }
    if (this.userName) {
        newRecord.userName = this.userName;
    }
    var curTimeData = GetTime(timeStamp);
    if (this.timeFilters !== false) {
        for (var t in this.timeFilters) {
            if (!this.timeFilters[t]) {
                continue;
            }
            newRecord[TimeTagKeys[t]] = curTimeData[t];
            newRecord[ScoreKeys[t]] = score;
        }
    } else { // No time filters
        newRecord.score = score;
    }
    if (this.tag) {
        newRecord.tag = this.tag;
    }
    if (extraData) {
        Object.assign(newRecord, extraData);
    }

    var self = this;
    return this.getMyRecordQuery().get()
        .then(function (querySnapshot) {
            var prevRecord, docID;
            if (querySnapshot.size > 0) {
                var doc = querySnapshot.docs[0];
                prevRecord = doc.data();
                docID = doc.id;
            }

            if (prevRecord) {
                if (self.timeFilters !== false) {
                    for (var t in self.timeFilters) {
                        if (!self.timeFilters[t]) {
                            continue;
                        }

                        var timeTagKey = TimeTagKeys[t];
                        if (prevRecord[timeTagKey] === newRecord[timeTagKey]) {
                            var scoreKey = ScoreKeys[t];
                            newRecord[scoreKey] = Math.max(prevRecord[scoreKey], newRecord[scoreKey]);
                        }
                    }
                } else { // No time filters
                    newRecord.score = Math.max(prevRecord.score, newRecord.score);
                }
            }
            if (docID === undefined) {
                docID = self.rootRef.doc().id;
            }
            return self.rootRef.doc(docID)
                .set(newRecord);
        });
}

export default Post;