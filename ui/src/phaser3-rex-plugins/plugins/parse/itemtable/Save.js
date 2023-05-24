import IsArray from '../../utils/object/IsArray.js';
import DataToItem from '../utils/DataToItem.js';
import SetOwnerAccessMode from '../utils/SetOwnerAccessMode.js';

var Save = function (data) { // JSON data, or parse object
    if (IsArray(data)) {
        return this.saveItems(data);
    }

    var self = this;
    return new Promise(function (resolve, reject) {
        if (self.primaryKeys.length > 0) {
            self.loadItem(data, 'id')
                .then(resolve, reject);
        } else {
            return resolve();
        }
    })
        .then(function (item) {
            item = DataToItem(data, self.customClass, item);
            SetOwnerAccessMode(item, self.ownerRead, self.ownerWrite);
            return item.save();
        })
}

export default Save;