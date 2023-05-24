var RotateAround = Phaser.Math.RotateAround;
var LocalToWorld = function (gameObject, localX, localY, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        if (GlobOut === undefined) {
            GlobOut = {};
        }
        out = GlobOut;
    }

    localX -= (gameObject.width * gameObject.originX);
    localY -= (gameObject.height * gameObject.originY);
    var point = {
        x: localX * gameObject.scaleX,
        y: localY * gameObject.scaleY
    };
    RotateAround(point, 0, 0, -gameObject.rotation);

    out.x = gameObject.x + localX;
    out.y = gameObject.y + localY;

    return out;
}

var GlobOut;
export { LocalToWorld };