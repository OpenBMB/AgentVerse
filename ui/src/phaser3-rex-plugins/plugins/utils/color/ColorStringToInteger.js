import { ColorNameToInteger } from './ColorNameToInteger';

var ColorStringToInteger = function (value) {
    if (typeof (value) !== 'string') {
        return value;
    }

    if (value.startsWith('#')) {
        value = parseInt(value.substring(1), 16);
    } else if (value.startsWith('0x')) {
        value = parseInt(value.substring(2), 16);
    } else {
        value = ColorNameToInteger(value);
    }
    return value;
}

export default ColorStringToInteger;