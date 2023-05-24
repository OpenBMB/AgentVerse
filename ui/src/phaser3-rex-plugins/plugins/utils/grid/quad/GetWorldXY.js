var GetWorldX = function (tileX, tileY, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globWorldXY;
    }

    var worldX, worldY;
    switch (this.mode) {
        case 0: // orthogonal
            worldX = tileX * this.width;
            worldY = tileY * this.height;
            break;
        case 1: // isometric
            worldX = (tileX - tileY) * this._halfWidth;
            worldY = (tileX + tileY) * this._halfHeight;
            break;
    }
    worldX += this.x;
    worldY += this.y;
    out.x = worldX;
    out.y = worldY;
    return out;
}

var globWorldXY = {};

export default GetWorldX;