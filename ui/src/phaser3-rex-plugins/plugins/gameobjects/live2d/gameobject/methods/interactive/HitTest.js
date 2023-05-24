var HitTest = function (hitAreaName, worldX, worldY, camera) {
    var modelXY = this.getModelXY(worldX, worldY, camera, true);
    return this.model.hitTest(hitAreaName, modelXY);
}

export default HitTest;