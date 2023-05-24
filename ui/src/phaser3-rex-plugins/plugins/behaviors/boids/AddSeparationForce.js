const Vector2 = Phaser.Math.Vector2;

var AddSeparationForce = function (myAgent, neighbors, weight, distanceThreshold, out) {
    // Steer to avoid crowding neighbors
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

    var agent;
    var dx, dy, angle, d, p;
    for (var i = 0, cnt = neighbors.length; i < cnt; i++) {
        agent = neighbors[i];
        if (agent === myAgent) {
            continue;
        }

        dx = myAgent.x - agent.x;
        dy = myAgent.y - agent.y;
        d = Math.sqrt((dx * dx) + (dy * dy));
        if (d > distanceThreshold) { // out-of-range
            continue;
        }

        p = weight;
        if (distanceThreshold !== Infinity) {
            p *= (distanceThreshold - d) / distanceThreshold;
        }
        angle = Math.atan2(dy, dx);        
        out.x += (Math.cos(angle) * p);
        out.y += (Math.sin(angle) * p);
    }

    return out;
}

export default AddSeparationForce;