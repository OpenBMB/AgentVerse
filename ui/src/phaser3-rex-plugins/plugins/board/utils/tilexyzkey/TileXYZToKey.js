var TileXYZToKey = function (tileX, tileY, tileZ, separator) {
    if (separator === undefined) {
        separator = ',';
    }
    return `${tileX}${separator}${tileY}${separator}${tileZ}`;
}
export default TileXYZToKey;