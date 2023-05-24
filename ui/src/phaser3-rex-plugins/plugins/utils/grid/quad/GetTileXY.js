var GetTileXY = function (worldX, worldY, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globTileXY;
    }

    worldX -= this.x;
    worldY -= this.y;
    var tmpx = worldX / this.width;
    var tmpy = worldY / this.height;
    switch (this.mode) {
        case 0: // orthogonal
            out.x = Math.round(tmpx);
            out.y = Math.round(tmpy);
            break;
        case 1: // isometric            
            out.x = Math.round(+tmpx + tmpy);
            out.y = Math.round(-tmpx + tmpy);
            break;
    }
    return out;
}

var globTileXY = {};

export default GetTileXY;