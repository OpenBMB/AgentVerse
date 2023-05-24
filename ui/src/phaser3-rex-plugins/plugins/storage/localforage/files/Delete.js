import { GetHeaderKey, GetContentKey } from './GetKey.js';
import RemoveItems from '../utils/RemoveItems.js';

var Delete = function (fileID) {
    var headerKey = GetHeaderKey(fileID);
    var contentKey = GetContentKey(fileID);
    return RemoveItems([headerKey, contentKey]);
}

export default Delete;