import UidToObj from '../../graphitem/UidToObj.js';
import DistanceBetween from '../../../utils/math/distance/DistanceBetween.js';

var GetEdgeLength = function (gameObejct) {
    var edge = this.getEdgeData(gameObejct);
    if (!edge) {
        return 0;
    }
    var vAGO = UidToObj(edge.vA);
    var vBGO = UidToObj(edge.vB);
    if ((!vAGO) || (!vBGO)) {
        return 0;
    }

    return DistanceBetween(vAGO.x, vAGO.y, vBGO.x, vBGO.y);
};

export default GetEdgeLength;