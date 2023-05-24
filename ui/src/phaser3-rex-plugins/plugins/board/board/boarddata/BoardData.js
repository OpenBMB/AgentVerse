import Clear from '../../../utils/object/Clear.js';
import IsEmpty from '../../../utils/object/IsEmpty.js';

class BoardData {
    constructor() {
        this.XYZToUID = {}; // [x][y][z] : uid
        this.UIDToXYZ = {}; // uid : xyz
        this.clear();
    }

    shutdown(fromScene) {
        this.XYZToUID = undefined;
        this.UIDToXYZ = undefined;
        return this;
    }

    destroy(fromScene) {
        this.shutdown(fromScene);
        return this;
    }

    clear() {
        Clear(this.UIDToXYZ);
        Clear(this.XYZToUID);
        this.chessCount = 0;
        this.clearBounds();
        return this;
    }

    clearBounds() {
        this._xMax = undefined;
        this._xMin = undefined;
        this._yMax = undefined;
        this._yMin = undefined;
        return this;
    }

    addUID(uid, x, y, z) {
        if (!this.XYZToUID.hasOwnProperty(x)) {
            this.XYZToUID[x] = {};
        }
        var tmpx = this.XYZToUID[x];
        if (!tmpx.hasOwnProperty(y)) {
            tmpx[y] = {};
        }
        var tmpy = tmpx[y];
        tmpy[z] = uid;
        this.UIDToXYZ[uid] = {
            x: x,
            y: y,
            z: z
        };

        this.chessCount++;
        this.clearBounds();
        return this;
    }

    getUID(x, y, z) {
        // (x,y,z) -> uid
        // (x,y) -> zHash = {z:uid}
        var tmp = this.XYZToUID[x];
        if (tmp) {
            tmp = tmp[y];
            if (tmp) {
                if (z !== undefined) {
                    tmp = tmp[z];
                }
            }
        }
        return tmp;
    }

    removeUID(x, y, z) {
        if (!this.XYZToUID.hasOwnProperty(x)) {
            return this;
        }
        var tmpx = this.XYZToUID[x];
        if (!tmpx.hasOwnProperty(y)) {
            return this;
        }
        var tmpy = tmpx[y];
        if (!tmpy.hasOwnProperty(z)) {
            return this;
        }

        var uid = tmpy[z];
        delete tmpy[z];
        delete this.UIDToXYZ[uid];
        if (IsEmpty(tmpy)) {
            delete tmpx[y];
        }
        if (IsEmpty(tmpx)) {
            delete this.XYZToUID[x];
        }

        this.chessCount--;
        this.clearBounds();
        return this;
    }

    exists(uid) {
        return this.UIDToXYZ.hasOwnProperty(uid);
    }

    contains(x, y, z) {
        return (this.getUID(x, y, z) != null);
    }

    getXYZ(uid) {
        if (this.exists(uid)) {
            return this.UIDToXYZ[uid];
        }
        return null;
    }

    get xMax() {
        if (this._xMax === undefined) {
            this._xMax = -Infinity;
            var UIDToXYZ = this.UIDToXYZ,
                x;
            for (var uid in UIDToXYZ) {
                x = UIDToXYZ[uid].x;
                if (this._xMax < x) {
                    this._xMax = x;
                }
            }
        }

        return this._xMax;
    }

    get xMin() {
        if (this._xMin === undefined) {
            this._xMin = Infinity;
            var UIDToXYZ = this.UIDToXYZ,
                x;
            for (var uid in UIDToXYZ) {
                x = UIDToXYZ[uid].x;
                if (this._xMin > x) {
                    this._xMin = x;
                }
            }
        }

        return this._xMin;
    }

    get yMax() {
        if (this._yMax === undefined) {
            this._yMax = -Infinity;
            var UIDToXYZ = this.UIDToXYZ,
                y;
            for (var uid in UIDToXYZ) {
                y = UIDToXYZ[uid].y;
                if (this._yMax < y) {
                    this._yMax = y;
                }
            }
        }

        return this._yMax;
    }

    get yMin() {
        if (this._yMin === undefined) {
            this._yMin = Infinity;
            var UIDToXYZ = this.UIDToXYZ,
                y;
            for (var uid in UIDToXYZ) {
                y = UIDToXYZ[uid].y;
                if (this._yMin > y) {
                    this._yMin = y;
                }
            }
        }

        return this._yMin;
    }
}

export default BoardData;