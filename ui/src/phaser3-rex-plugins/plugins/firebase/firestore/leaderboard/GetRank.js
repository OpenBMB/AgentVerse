import FindFirst from '../utils/query/FindFirst.js';

var GetRank = function (userID) {
    if (userID === undefined) {
        userID = this.userID;
    }

    var query = this.getPageQuery().next;
    var testCallback = function (doc) {
        var item = doc.data();
        return (item.userID === userID);
    }
    return FindFirst(query, testCallback)
        .then(function (result) {
            return Promise.resolve({ userID: userID, rank: result.index });
        })
};


export default GetRank;