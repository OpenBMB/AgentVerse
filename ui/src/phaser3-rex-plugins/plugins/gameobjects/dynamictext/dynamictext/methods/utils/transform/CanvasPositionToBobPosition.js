const RotateAround = Phaser.Math.RotateAround;

var CanvasPositionToBobPosition = function (canvasX, canvasY, bob, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        if (globPoint === undefined) {
            globPoint = {};
        }
        out = globPoint;
    }

    out.x = (canvasX - bob.drawX) / bob.scaleX;
    out.y = (canvasY - bob.drawY) / bob.scaleY;

    if (bob.rotation !== 0) {
        RotateAround(out, 0, 0, -bob.rotation);
    }
    return out;
}

var globPoint;

export default CanvasPositionToBobPosition;