var HitAreaNameToDrawIndex = function (hitAreaName) {
    var count = this._modelSetting.getHitAreasCount();
    for (var i = 0; i < count; i++) {
        if (this._modelSetting.getHitAreaName(i) === hitAreaName) {
            var drawId = this._modelSetting.getHitAreaId(i)
            var drawIndex = this._model.getDrawableIndex(drawId);
            return drawIndex;
        }
    }
    return undefined;
}

export default HitAreaNameToDrawIndex;