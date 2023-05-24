var MapNeighbors = function (chess, distance, callback, scope) {
    if (typeof (distance) !== 'number') {
        scope = callback;
        callback = distance;
        distance = 1;
    }

    var tileXYArray = this.getTileXYAtDirection(chess, undefined, distance);
    // Array of {x,y,direction}
    return tileXYArray.map(callback, scope);
}

export default MapNeighbors;