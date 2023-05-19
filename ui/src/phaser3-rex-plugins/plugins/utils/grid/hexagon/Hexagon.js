// https://www.redblobgames.com/grids/hexagons/

import GetCellWidth from '../../../geom/hexagon/Width.js';
import GetCellHeight from '../../../geom/hexagon/Height.js';
import CONST from './const.js';
import GetWorldXY from './GetWorldXY.js';
import GetWorldX from './GetWorldX.js';
import GetWorldY from './GetWorldY.js';
import GetTileXY from './GetTileXY.js';
import GetTileX from './GetTileX.js';
import GetTileY from './GetTileY.js';
import GetValue from '../../object/GetValue.js';

const ODD_R = CONST.ODD_R;
const EVEN_R = CONST.EVEN_R;
const ODD_Q = CONST.ODD_Q;
const EVEN_Q = CONST.EVEN_Q;

class Hexagon {
    constructor(config) {
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setType(GetValue(o, 'staggeraxis', 1), GetValue(o, 'staggerindex', 1));
        this.setDirectionMode();
        this.setOriginPosition(GetValue(o, 'x', 0), GetValue(o, 'y', 0));
        var size = GetValue(o, 'size', undefined);
        if (size !== undefined) {
            this.setCellRadius(size);
        } else {
            this.setCellSize(GetValue(o, 'cellWidth', 0), GetValue(o, 'cellHeight', 0));
        }
    }

    setType(staggeraxis, staggerindex) {
        if (typeof (staggeraxis) === 'string') {
            staggeraxis = STAGGERAXIS[staggeraxis]
        }
        if (typeof (staggerindex) === 'string') {
            staggerindex = STAGGERINDEX[staggerindex]
        }
        this.staggeraxis = staggeraxis; // 0|y(flat), or 1|x(pointy)
        this.staggerindex = staggerindex; // even, or odd

        if (staggeraxis === 0) { // flat
            this.mode = (staggerindex === 0) ? EVEN_Q : ODD_Q;
        } else { // pointy
            this.mode = (staggerindex === 0) ? EVEN_R : ODD_R;
        }
        return this;
    }

    setDirectionMode() {
        this.directions = 6;
        return this;
    }

    setOriginPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
        this._halfWidth = value / 2;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
        this._halfHeight = value / 2;
    }

    setCellSize(width, height) {
        this.width = width;
        this.height = height;
        return this;
    }

    setCellRadius(size) {
        this.size = size;
        var hexagon = {
            size: this.size,
            type: this.staggeraxis
        }
        var cellWidth = GetCellWidth(hexagon);
        var cellHeight = GetCellHeight(hexagon);
        this.setCellSize(cellWidth, cellHeight);
        return this;
    }

    get cellWidth() {
        return this.width;
    }

    set cellWidth(value) {
        this.width = value;
    }

    get cellHeight() {
        return this.height;
    }

    set cellHeight(value) {
        this.height = value;
    }
}

var methods = {
    getWorldXY: GetWorldXY,
    getWorldX: GetWorldX,
    getWorldY: GetWorldY,
    getTileXY: GetTileXY,
    getTileX: GetTileX,
    getTileY: GetTileY,
}
Object.assign(
    Hexagon.prototype,
    methods
);

const STAGGERAXIS = {
    'y': 0,
    'x': 1
};

const STAGGERINDEX = {
    'even': 0,
    'odd': 1
}

export default Hexagon;
