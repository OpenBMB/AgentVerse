import HasValue from './HasValue.js';
import GetValue from './GetValue.js';

var GetValueFromAliasKeys = function (source, key0, key1, key2, defaultValue) {
    if (HasValue(source, key0)) {
        return GetValue(source, key0);
    } else if (key1 && HasValue(source, key1)) {
        return GetValue(source, key1);
    } else if (key2 && HasValue(source, key2)) {
        return GetValue(source, key2);
    } else {
        return defaultValue;
    }

}

export default GetValueFromAliasKeys;