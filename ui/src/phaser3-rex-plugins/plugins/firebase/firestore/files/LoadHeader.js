import DocToHeader from './DocToHeader.js';

// Internal used
var LoadHeader = function (fileID) {
    var userID = this.userID;
    let header = this.cacheHeaders[fileID];
    if (header && (header.userID === userID)) {
        return Promise.resolve(header);
    }

    // Can't find in cache headers, load from firestore    
    var self = this;
    return this.getFileQuery(userID, fileID, 'header').limit(1).get()
        .then(function (querySnapshot) {
            let header = undefined;
            if (querySnapshot.size > 0) {
                var doc = querySnapshot.docs[0];
                header = DocToHeader(doc);
                self.cacheHeaders[fileID] = header; // Cache it
            }
            return Promise.resolve(header);
        });
}

export default LoadHeader;