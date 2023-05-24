var prevTime, maxDelta;
var LogMaxDelta = function (time) {
    if (prevTime === undefined) {
        prevTime = time;
        maxDelta = 0;
    } else {
        var dt = time - prevTime;
        prevTime = time;
        if (maxDelta < dt) {
            maxDelta = dt;
            console.log(dt);
        }
    }
}

export default LogMaxDelta;