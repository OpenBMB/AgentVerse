var GetCost = function (curTileXY, tileXYArray) {
    if (typeof (this.costCallback) === 'number') {
        return this.costCallback;
    }
    if (this.costCallbackScope) {
        return this.costCallback.call(this.costCallbackScope, curTileXY, this, tileXYArray);
    } else {
        return this.costCallback(curTileXY, this, tileXYArray);
    }
}
export default GetCost;