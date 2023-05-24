import Clear from './Clear.js';

/**
 * Shallow Object Clone. Will not out nested objects.
 * @param {object} obj JSON object
 * @param {object} ret JSON object to return, set null to return a new object
 * @returns {object} this object
 */
var Clone = function (obj, out) {
    var objIsArray = Array.isArray(obj);

    if (out === undefined) {
        out = (objIsArray) ? [] : {};
    } else {
        Clear(out);
    }

    if (objIsArray) {
        out.length = obj.length;
        for (var i = 0, cnt = obj.length; i < cnt; i++) {
            out[i] = obj[i];
        }
    } else {
        for (var key in obj) {
            out[key] = obj[key];
        }
    }

    return out;
};

export default Clone;
