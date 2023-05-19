var Delete = function (fileID) {
    var userID = this.userID;
    var self = this;
    return LoadHeader.call(this, fileID) // Try load header
        .then(function (prevHeader) {
            if (!prevHeader) { // File dose not exist
                return Promise.resolve({
                    userID: userID,
                    fileID: fileID
                });
            }

            var batch = self.database.batch();
            batch.delete(self.rootRef.doc(prevHeader.headerDocID));
            if (prevHeader.contentDocID) {
                batch.delete(self.rootRef.doc(prevHeader.contentDocID));
            }
            return batch.commit();
        })
        .then(function () {
            if (self.cacheHeaders.hasOwnProperty(fileID)) {
                delete self.cacheHeaders[fileID];
            }

            return Promise.resolve({
                userID: userID,
                fileID: fileID
            });
        })
        .catch(function (error) {
            return Promise.reject({
                error: error,
                userID: userID,
                fileID: fileID
            });
        });
}

export default Delete;