import { TimeTagKeys, ScoreKeys, FullTimeName } from './Const.js';

var GetScore = function (userID) {
    var self = this;
    return this.getMyRecordQuery(userID).find()
        .then(function (results) {
            var myRecord = results[0];
            if (myRecord) {
                myRecord = myRecord.toJSON();
            }
            return Promise.resolve(myRecord);
        });
}

export default GetScore;