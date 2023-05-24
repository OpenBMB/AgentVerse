import { GetHeaderKey, GetContentKey } from './GetKey.js';
import GetItems from '../utils/GetItems.js';
import SetItems from '../utils/SetItems.js';

var Save = function (fileID, header, content, updateMode) {
    if (typeof (content) === 'boolean') {
        updateMode = content;
        content = undefined;
    }
    if (updateMode === undefined) {
        updateMode = false;
    }

    if (header === undefined) {
        header = {};
    }

    header.fileID = fileID;

    if (content) {
        content.fileID = fileID;
    }

    var headerKey = GetHeaderKey(fileID);
    var contentKey = GetContentKey(fileID);
    var self = this;
    var prevHeader, prevContent;
    return new Promise(function (resolve, reject) {
        if (updateMode) {
            GetItems([headerKey, contentKey])
                .then(function (data) {
                    prevHeader = self.toLoadData(data[headerKey]);
                    prevContent = self.toLoadData(data[contentKey]);
                    resolve();
                })
        } else {
            resolve();
        }
    })
        .then(function () {
            if (prevHeader && header) {
                header = Object.assign(prevHeader, header);
            }
            if (prevContent && content) {
                content = Object.assign(prevContent, content);
            }

            self.cacheHeaders[fileID] = header;

            var data = {};
            if (header) {
                data[headerKey] = self.toSaveData(header);
            }
            if (content) {
                data[contentKey] = self.toSaveData(content);
            }

            return SetItems(data, self.store);
        })
        .then(function () {
            return Promise.resolve({
                fileID: fileID
            });
        })
        .catch(function (error) {
            return Promise.reject({
                error: error,
                fileID: fileID
            });
        });
}

export default Save;