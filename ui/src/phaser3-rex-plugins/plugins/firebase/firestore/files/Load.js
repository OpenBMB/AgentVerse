import DocToHeader from './DocToHeader.js';

var Load = function (fileID) {
    var userID = this.userID;

    var self = this;
    return this.getFileQuery(userID, fileID).get()
        .then(function (querySnapshot) {
            var header, content;
            querySnapshot.forEach(function (doc) {
                switch (docData.type) {
                    case 'header':
                        header = DocToHeader(doc);
                        break;
                    case 'content':
                        content = doc.data();
                        break;
                }
            });
            return Promise.resolve({
                userID: userID,
                fileID: fileID,
                header: header,
                content: content
            });
        })
        .catch(function () {
            return Promise.reject({
                error: error,
                userID: userID,
                fileID: fileID
            });
        });
}

export default Load;