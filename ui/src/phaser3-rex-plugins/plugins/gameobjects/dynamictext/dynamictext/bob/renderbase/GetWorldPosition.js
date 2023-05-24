import GetBobWorldPosition from '../../methods/utils/transform/GetBobWorldPosition.js';

var GetWorldPosition = function (offsetX, offsetY, out) {
    return GetBobWorldPosition(this.parent, this, offsetX, offsetY, out);
}

export default GetWorldPosition;