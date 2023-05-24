import { IsHeaderKey, GetFileID } from './GetKey.js';
import GetItems from '../utils/GetItems.js';
import Clear from '../../../utils/object/Clear.js';

var LoadHeaders = function () {
    var self = this;
    return this.store.keys()
        .then(function (keys) {
            return GetItems(keys.filter(IsHeaderKey), self.store);
        })
        .then(function (data) {
            Clear(self.cacheHeaders);
            for (var key in data) {
                self.cacheHeaders[GetFileID(key)] = self.toLoadData(data[key]);
            }

            return Promise.resolve({
                headers: self.cacheHeaders
            });
        })
        .catch(function () {
            return Promise.reject({
                error: error,
            });
        });
}

export default LoadHeaders;