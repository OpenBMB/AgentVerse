import UUID from '../../../utils/string/UUID.js';

var sn = null;
var snPrefix = '#';

var SetSerialNumber = function (value) {
    if (value === undefined) {
        value = null;
    }

    sn = value;
}

var SetSerialNumberPrefix = function (prefix) {
    snPrefix = prefix;
}

var GetSerialNumber = function () {
    return sn;
}

var CreateID = function () {
    if (sn === null) {
        return UUID();
    }

    sn += 1;
    return `${snPrefix}${sn}`;
}

export {
    CreateID,
    SetSerialNumber,
    SetSerialNumberPrefix,
    GetSerialNumber,
};