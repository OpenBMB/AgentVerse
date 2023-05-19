import IsPlainObject from '../../utils/object/IsPlainObject.js';

var IsTileXYZ = function (obj) {
    return (obj) &&
        (IsPlainObject(obj) || obj.isTileXYZ);
}

export default IsTileXYZ;