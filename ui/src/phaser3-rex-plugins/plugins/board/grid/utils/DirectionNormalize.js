import Wrap from '../../../utils/math/Wrap.js';

var DirectionNormalize = function (direction) {
    return Wrap(direction, 0, this.directions);
}

export default DirectionNormalize;