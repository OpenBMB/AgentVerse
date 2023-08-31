var Clear = function () {
    var userID = this.userID;
    var self = this;
    return this.getFileQuery(userID, undefined, 'header')
        .get()
        .then(function (querySnapshot) {
            var batch = self.database.batch();
            var header;
            querySnapshot.forEach(function (doc) {
                header = DocToHeader(doc);
                batch.delete(self.rootRef.doc(header.headerDocID));
                if (header.contentDocID) {
                    batch.delete(self.rootRef.doc(header.contentDocID));
                }
            });
            return batch.commit();
        })
        .then(function () {
            self.clearCache();
            return Promise.resolve({
                userID: userID
            });
        })
        .catch(function (error) {
            return Promise.reject({
                error: error,
                userID: userID
            });
        });
}

export default Clear;