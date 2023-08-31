import { GetHeaderKey, GetContentKey } from './GetKey.js';
import GetItems from '../utils/GetItems.js';

var Load = function (fileID) {
    var headerKey = GetHeaderKey(fileID);
    var contentKey = GetContentKey(fileID);
    var self = this;
    return GetItems([headerKey, contentKey], this.store)
        .then(function (data) {
            var header = self.toLoadData(data[headerKey]);
            var content = self.toLoadData(data[contentKey]);
            self.cacheHeaders[fileID] = header;
            return Promise.resolve({
                fileID: fileID,
                header: header,
                content: content
            })
        })
        .catch(function (error) {
            return Promise.reject({
                fileID: fileID,
                error: error
            })
        })
}

export default Load;