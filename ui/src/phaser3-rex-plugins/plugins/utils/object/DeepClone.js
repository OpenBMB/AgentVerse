import IsPlainObject from './IsPlainObject.js';

var DeepClone = function (inObject) {
    var outObject;
    var value;
    var key;

    if ((inObject == null) || (typeof inObject !== 'object')) {
        //  inObject is not an object
        return inObject;
    }

    //  Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {};

    if (IsPlainObject(inObject)) {
        for (key in inObject) {
            value = inObject[key];

            //  Recursively (deep) copy for nested objects, including arrays
            outObject[key] = DeepClone(value);
        }

    } else {
        outObject = inObject;
    }

    return outObject;
};

export default DeepClone;