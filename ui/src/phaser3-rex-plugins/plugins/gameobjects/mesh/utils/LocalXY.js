const RotateAround = Phaser.Math.RotateAround;

var LocalXYToWorldXY = function (gameObject, localX, localY) {
    var ox = gameObject.width / 2;
    var oy = gameObject.height / 2;
    out.x = localX - ox;
    out.y = localY - oy;
    RotateAround(out, 0, 0, gameObject.rotation);
    out.x *= gameObject.scaleX;
    out.y *= gameObject.scaleY;
    out.x += gameObject.x;
    out.y += gameObject.y;

    return out;
}

var WorldXYToLocalXY = function (gameObject, worldX, worldY) {
    var ox = gameObject.width / 2;
    var oy = gameObject.height / 2;

    out.x = worldX - gameObject.x;
    out.y = worldY - gameObject.y;
    out.x /= gameObject.scaleX;
    out.y /= gameObject.scaleY;
    RotateAround(out, 0, 0, -gameObject.rotation);
    out.x += ox;
    out.y += oy;

    return out;
}

var out = { x: 0, y: 0 };

export {
    LocalXYToWorldXY, WorldXYToLocalXY
}