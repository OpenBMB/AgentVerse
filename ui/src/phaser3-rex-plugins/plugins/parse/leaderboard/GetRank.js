import FindFirst from '../utils/query/FindFirst.js';

var GetRank = function (userID) {
    if (userID === undefined) {
        userID = this.userID;
    }

    var query = this.getPageQuery();
    var testCallback = function (item) {
        return (item.get('userID') === userID);
    }
    return FindFirst(query, testCallback)
        .then(function (result) {
            return Promise.resolve({ userID: userID, rank: result.index });
        })
};


export default GetRank;