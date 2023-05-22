var Mirror = function (mode, chessTileXYZMap, out) {
    if (mode === undefined) {
        mode = 1;
    } else if (typeof (mode) === 'string') {
        mode = MODE[mode];
    }
    if (chessTileXYZMap === undefined) {
        chessTileXYZMap = this.tileXYZMap; // {uid:{x,y,z}}
    }
    if (out === undefined) {
        out = {};
    }
    var chessTileXYZ, newTileXYZ;
    for (var uid in chessTileXYZMap) {
        chessTileXYZ = chessTileXYZMap[uid];
        newTileXYZ = this.board.mirror(chessTileXYZ, mode);
        newTileXYZ.z = chessTileXYZ.z;
        out[uid] = newTileXYZ;
    }
    return out; // {uid:{x,y,z}}
}

const MODE = {
    x: 1,
    y: 2,
    'x&y': 3
}
export default Mirror;