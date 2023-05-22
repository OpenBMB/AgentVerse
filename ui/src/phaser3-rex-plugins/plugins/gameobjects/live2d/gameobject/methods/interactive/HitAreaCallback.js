var HitAreaCallback = function (shape, localX, localY, gameObject) {
    var model = gameObject.model;
    if (!model) {
        return false;
    }

    var matrixXY = model.localXYToModelMatrixXY(localX, localY, true);
    var x = matrixXY.x
    var y = matrixXY.y;
    var modelSetting = model._modelSetting;
    var count = modelSetting.getHitAreasCount();
    var anyHit = false;
    var hitTestResult = model._hitTestResult;
    for (var i = 0; i < count; i++) {
        var hitAreaName = modelSetting.getHitAreaName(i);
        var isHit = model.hitTest(hitAreaName, x, y);
        hitTestResult[hitAreaName] = isHit;
        anyHit = anyHit || isHit;
    }

    return anyHit;
}

export default HitAreaCallback;