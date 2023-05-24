const RotateAround = Phaser.Math.RotateAround;

var BobPositionToCanvasPosition = function (bob, bobX, bobY, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        if (globPoint === undefined) {
            globPoint = {};
        }
        out = globPoint;
    }

    out.x = bobX;
    out.y = bobY;

    if (bob.rotation !== 0) {
        RotateAround(out, 0, 0, bob.rotation);
    }

    out.x = (out.x * bob.scaleX) + bob.drawX;
    out.y = (out.y * bob.scaleY) + bob.drawY;

    return out;
}

var globPoint;

export default BobPositionToCanvasPosition