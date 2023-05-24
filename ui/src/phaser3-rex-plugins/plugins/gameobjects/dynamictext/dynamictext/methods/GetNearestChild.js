import GetBobCenterPosition from './utils/transform/GetBobCenterPosition';

const GetDistance = Phaser.Math.Distance.BetweenPointsSquared;

var GetNearestChild = function (canvasX, canvasY) {
    var pointA = { x: canvasX, y: canvasY };

    var minDistance = Infinity;
    var nearestChild = null;
    this.forEachRenderableChild(function (child) {
        var distance = GetDistance(pointA, GetBobCenterPosition(child, true));
        if (minDistance > distance) {
            minDistance = distance;
            nearestChild = child;
        }
    })

    return nearestChild;
}

export default GetNearestChild;