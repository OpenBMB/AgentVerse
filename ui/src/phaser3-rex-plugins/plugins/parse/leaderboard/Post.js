import GetTime from './GetTime.js';
import { TimeTagKeys, ScoreKeys } from './Const.js';
import DataToItem from '../utils/DataToItem.js';

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
    var curTimeData = GetTime();
    var self = this;
    return this.getMyRecordQuery().find()
        .then(function (results) {
            var prevRecord = results[0];
            if (prevRecord) {
                if (self.timeFilters !== false) {
                    for (var t in self.timeFilters) {
                        if (!self.timeFilters[t]) {
                            continue;
                        }

                        var timeTagKey = TimeTagKeys[t];
                        if (prevRecord.get(timeTagKey) === newRecord[timeTagKey]) {
                            var scoreKey = ScoreKeys[t];
                            newRecord[scoreKey] = Math.max(prevRecord.get(scoreKey), newRecord[scoreKey]);
                        }
                    }
                } else { // No time filters
                    newRecord.score = Math.max(prevRecord.get('score'), newRecord.score);
                }
            }
            var item = DataToItem(newRecord, self.customClass, prevRecord);
            return item.save();
        });
}

export default Post;