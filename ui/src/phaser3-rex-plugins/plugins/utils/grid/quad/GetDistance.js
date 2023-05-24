var GetDistance = function (tileA, tileB, roughMode) {
    var dx = tileB.x - tileA.x;
    var dy = tileB.y - tileA.y;
    var dist;
    if (roughMode) {
        dist = Math.abs(dx) + Math.abs(dy);
    } else {
        dist = Math.sqrt(dx * dx + dy * dy);
    }
    return dist;
}
export default GetDistance;