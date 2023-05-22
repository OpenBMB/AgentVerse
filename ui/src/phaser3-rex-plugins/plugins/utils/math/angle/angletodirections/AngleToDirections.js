var AngleToDirections = function (angle, dirMode, out) {
    if (out === undefined) {
        out = {}
    } else if (out === true) {
        out = globOut;
    }

    out.left = false;
    out.right = false;
    out.up = false;
    out.down = false;

    angle = (angle + 360) % 360;
    switch (dirMode) {
        case 0: // up & down
            if (angle < 180) {
                out.down = true;
            } else {
                out.up = true;
            }
            break;

        case 1: // left & right
            if ((angle > 90) && (angle <= 270)) {
                out.left = true;
            } else {
                out.right = true;
            }
            break;

        case 2: // 4 dir
            if ((angle > 45) && (angle <= 135)) {
                out.down = true;
            } else if ((angle > 135) && (angle <= 225)) {
                out.left = true;
            } else if ((angle > 225) && (angle <= 315)) {
                out.up = true;
            } else {
                out.right = true;
            }
            break;

        case 3: // 8 dir
            if ((angle > 22.5) && (angle <= 67.5)) {
                out.down = true;
                out.right = true;
            } else if ((angle > 67.5) && (angle <= 112.5)) {
                out.down = true;
            } else if ((angle > 112.5) && (angle <= 157.5)) {
                out.down = true;
                out.left = true;
            } else if ((angle > 157.5) && (angle <= 202.5)) {
                out.left = true;
            } else if ((angle > 202.5) && (angle <= 247.5)) {
                out.left = true;
                out.up = true;
            } else if ((angle > 247.5) && (angle <= 292.5)) {
                out.up = true;
            } else if ((angle > 292.5) && (angle <= 337.5)) {
                out.up = true;
                out.right = true;
            } else {
                out.right = true;
            }
            break;
    }

    return out;
};

var globOut = {};

export default AngleToDirections;