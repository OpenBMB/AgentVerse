const Vector2 = Phaser.Math.Vector2;
const Distance = Phaser.Math.Distance.Between;

var AddCohesionForce = function (myAgent, neighbors, weight, distanceThreshold, out) {
    // Steer towards average position of neighbors (long range attraction)
    if (out === undefined) {
        out = new Vector2();
    }
    if (weight <= 0) {
        return out;
    }
    if ((neighbors.length == 0) ||
        ((neighbors.length === 1) && (neighbors[0] === myAgent))) {
        return out;
    }

    centerPosition.reset();
    var agent, validNeighborsCount = 0;
    for (var i = 0, cnt = neighbors.length; i < cnt; i++) {
        agent = neighbors[i];
        if (agent === myAgent) {
            continue;
        }
        if (Distance(agent.x, agent.y, myAgent.x, myAgent.y) > distanceThreshold) {
            continue;
        }

        centerPosition.add(agent);
        validNeighborsCount++;
    }
    if (validNeighborsCount === 0) {
        return out;
    }
    centerPosition.scale(1 / validNeighborsCount);

    var dx = centerPosition.x - myAgent.x;
    var dy = centerPosition.y - myAgent.y;
    var d = Math.sqrt((dx * dx) + (dy * dy));

    var p = weight;
    if (distanceThreshold !== Infinity) {
        p *= (d / distanceThreshold);
    }

    var angle = Math.atan2(dy, dx);
    out.x += (Math.cos(angle) * p);
    out.y += (Math.sin(angle) * p);

    return out;
}

var centerPosition = new Vector2();

export default AddCohesionForce;