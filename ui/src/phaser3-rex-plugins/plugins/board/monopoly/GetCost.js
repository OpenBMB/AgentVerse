var GetCost = function (curTileXY, preTileXY) {
    if (typeof (this.costCallback) === 'number') {
        return this.costCallback;
    }
    if (this.costCallbackScope) {
        return this.costCallback.call(this.costCallbackScope, curTileXY, preTileXY, this);
    } else {
        return this.costCallback(curTileXY, preTileXY, this);
    }
}
export default GetCost;