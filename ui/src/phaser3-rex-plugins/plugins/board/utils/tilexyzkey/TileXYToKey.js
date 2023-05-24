var TileXYToKey = function (tileX, tileY, separator) {
    if (separator === undefined) {
        separator = ',';
    }
    return `${tileX}${separator}${tileY}`;
}
export default TileXYToKey;