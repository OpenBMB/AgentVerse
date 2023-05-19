var SetVelocity = function (gameObject, vx, vy, onChange) {
    var body = gameObject.body;
    var preVx = body.velocity.x,
        preVy = body.velocity.y;
    if ((vx === preVx) && (vy === preVy)) {
        return
    }
    body.setVelocity(vx, vy);
    if (onChange) {
        onChange(vx, vy, preVx, preVy);
    }
}

var SetAcceleration = function (gameObject, ax, ay, onChange) {
    var body = gameObject.body;
    var preAx = body.acceleration.x,
        preAy = body.acceleration.y;
    if ((ax === preAx) && (ay === preAy)) {
        return;
    }
    body.setAcceleration(ax, ay);
    if (onChange) {
        onChange(ax, ay, preAx, preAy);
    }
}

var SetAngularVelocity = function (gameObject, av, onChange) {
    var body = gameObject.body;
    var preAv = body.angularVelocity;
    if (av === preAv) {
        return;
    }
    body.setAngularVelocity(av);
    if (onChange) {
        onChange(av, preAv);
    }
}

var SetAngularAcceleration = function (gameObject, aa, onChange) {
    var body = gameObject.body;
    var preAa = body.angularAcceleration
    if (aa === preAa) {
        return;
    }
    body.setAngularAcceleration(aa);
    if (onChange) {
        onChange(aa, preAa);
    }
}

export {
    SetVelocity,
    SetAcceleration,
    SetAngularVelocity,
    SetAngularAcceleration
}