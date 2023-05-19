var GetTileX = function (worldX, worldY) {
    return this.getTileXY(worldX, worldY, true).x;
}

export default GetTileX;