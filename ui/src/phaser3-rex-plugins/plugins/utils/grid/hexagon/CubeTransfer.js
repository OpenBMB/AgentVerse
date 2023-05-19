import CONST from './const.js';

const ODD_R = CONST.ODD_R;
const EVEN_R = CONST.EVEN_R;
const ODD_Q = CONST.ODD_Q;
const EVEN_Q = CONST.EVEN_Q;

var cr2cube = function (mode, col, row, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globCube;
    }
    switch (mode) {
        case ODD_R:
            out.x = col - (row - (row & 1)) / 2;
            out.z = row;
            break;

        case EVEN_R:
            out.x = col - (row + (row & 1)) / 2;
            out.z = row;
            break;

        case ODD_Q:
            out.x = col;
            out.z = row - (col - (col & 1)) / 2;
            break;
        case EVEN_Q:
            out.x = col;
            out.z = row - (col + (col & 1)) / 2;
            break;
    }
    out.y = -out.x - out.z;
    return out;
}

var roundcube = function (x, y, z, out) {
    if (typeof (x) !== 'number') {
        out = x;
        x = out.x;
        y = out.y;
        z = out.z;
    }

    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globCube;
    }
    var rx = Math.round(x);
    var ry = Math.round(y);
    var rz = Math.round(z);

    var dx = Math.abs(rx - x);
    var dy = Math.abs(ry - y);
    var dz = Math.abs(rz - z);

    if ((dx > dy) && (dx > dz)) {
        rx = -ry - rz;
    } else if (dy > dz) {
        ry = -rx - rz;
    } else {
        rz = -rx - ry;
    }
    out.x = rx;
    out.y = ry;
    out.z = rz;
    return out;
}

var cube2cr = function (mode, x, y, z, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globCR;
    }
    switch (mode) {
        case ODD_R:
            out.x = x + (z - (z & 1)) / 2;
            out.y = z;
            break;
        case EVEN_R:
            out.x = x + (z + (z & 1)) / 2;
            out.y = z;
            break;

        case ODD_Q:
            out.x = x;
            out.y = z + (x - (x & 1)) / 2;
            break;
        case EVEN_Q:
            out.x = x;
            out.y = z + (x + (x & 1)) / 2;
            break;
    }
    return out;
}

var qr2cube = function (q, r, out) {
    if (out === undefined) {
        out = {}
    } else if (out === true) {
        out = globCube;
    }
    out.x = q;
    out.y = -q - r;
    out.z = r;
    return out;
}

var cube2qr = function (x, y, z, out) {
    if (out === undefined) {
        out = {}
    } else if (out === true) {
        out = globQR;
    }

    out.q = x;
    out.r = z;
    return out;
}

var globCube = {};
var globCR = {};
var globQR = {};

export {
    cr2cube,
    roundcube,
    cube2cr,
    qr2cube,
    cube2qr,
};