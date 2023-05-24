import {
    GetDisplayWidth,
    GetDisplayHeight
} from '../size/GetDisplaySize.js';

const Rectangle = Phaser.Geom.Rectangle;
const Vector2 = Phaser.Math.Vector2;
const RotateAround = Phaser.Math.RotateAround;

var GetBounds = function (gameObject, output) {
    if (output === undefined) {
        output = new Rectangle();
    } else if (output === true) {
        if (GlobRect === undefined) {
            GlobRect = new Rectangle();
        }
        output = GlobRect;
    }

    if (gameObject.getBounds) {
        return gameObject.getBounds(output);
    }

    //  We can use the output object to temporarily store the x/y coords in:

    var TLx, TLy, TRx, TRy, BLx, BLy, BRx, BRy;

    // Instead of doing a check if parent container is
    // defined per corner we only do it once.
    if (gameObject.parentContainer) {
        var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();

        GetTopLeft(gameObject, output);
        parentMatrix.transformPoint(output.x, output.y, output);

        TLx = output.x;
        TLy = output.y;

        GetTopRight(gameObject, output);
        parentMatrix.transformPoint(output.x, output.y, output);

        TRx = output.x;
        TRy = output.y;

        GetBottomLeft(gameObject, output);;
        parentMatrix.transformPoint(output.x, output.y, output);

        BLx = output.x;
        BLy = output.y;

        GetBottomRight(gameObject, output);
        parentMatrix.transformPoint(output.x, output.y, output);

        BRx = output.x;
        BRy = output.y;
    }
    else {
        GetTopLeft(gameObject, output);

        TLx = output.x;
        TLy = output.y;

        GetTopRight(gameObject, output);;

        TRx = output.x;
        TRy = output.y;

        GetBottomLeft(gameObject, output);;

        BLx = output.x;
        BLy = output.y;

        GetBottomRight(gameObject, output);

        BRx = output.x;
        BRy = output.y;
    }

    output.x = Math.min(TLx, TRx, BLx, BRx);
    output.y = Math.min(TLy, TRy, BLy, BRy);
    output.width = Math.max(TLx, TRx, BLx, BRx) - output.x;
    output.height = Math.max(TLy, TRy, BLy, BRy) - output.y;

    return output;
}

var GlobRect = undefined;

var GetTopLeft = function (gameObject, output, includeParent) {
    if (output === undefined) {
        output = new Vector2();
    } else if (output === true) {
        if (GlobVector === undefined) {
            GlobVector = new Vector2();
        }
        output = GlobVector;
    }

    if (gameObject.getTopLeft) {
        return gameObject.getTopLeft(output);
    }

    output.x = gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX);
    output.y = gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY);

    return PrepareBoundsOutput(gameObject, output, includeParent);
};

var GetTopRight = function (gameObject, output, includeParent) {
    if (output === undefined) {
        output = new Vector2();
    } else if (output === true) {
        if (GlobVector === undefined) {
            GlobVector = new Vector2();
        }
        output = GlobVector;
    }

    if (gameObject.getTopRight) {
        return gameObject.getTopRight(output);
    }

    output.x = (gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX)) + GetDisplayWidth(gameObject);
    output.y = gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY);

    return PrepareBoundsOutput(gameObject, output, includeParent);
};

var GetBottomLeft = function (gameObject, output, includeParent) {
    if (output === undefined) {
        output = new Vector2();
    } else if (output === true) {
        if (GlobVector === undefined) {
            GlobVector = new Vector2();
        }
        output = GlobVector;
    }

    if (gameObject.getBottomLeft) {
        return gameObject.getBottomLeft(output);
    }

    output.x = gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX);
    output.y = (gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY)) + GetDisplayHeight(gameObject);

    return PrepareBoundsOutput(gameObject, output, includeParent);
};

var GetBottomRight = function (gameObject, output, includeParent) {
    if (output === undefined) {
        output = new Vector2();
    } else if (output === true) {
        if (GlobVector === undefined) {
            GlobVector = new Vector2();
        }
        output = GlobVector;
    }

    if (gameObject.getBottomRight) {
        return gameObject.getBottomRight(output);
    }

    output.x = (gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX)) + GetDisplayWidth(gameObject);
    output.y = (gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY)) + GetDisplayHeight(gameObject);

    return PrepareBoundsOutput(gameObject, output, includeParent);
};

var GlobVector = undefined;

var PrepareBoundsOutput = function (gameObject, output, includeParent) {
    if (includeParent === undefined) { includeParent = false; }

    if (gameObject.rotation !== 0) {
        RotateAround(output, gameObject.x, gameObject.y, gameObject.rotation);
    }

    if (includeParent && gameObject.parentContainer) {
        var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();

        parentMatrix.transformPoint(output.x, output.y, output);
    }

    return output;
};

export {
    GetBounds,
    GetTopLeft,
    GetTopRight,
    GetBottomLeft,
    GetBottomRight,
}