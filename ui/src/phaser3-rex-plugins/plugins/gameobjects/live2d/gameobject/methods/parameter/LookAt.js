
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

var LookAt = function (x, y, config) {
    if (IsPlainObject(x)) {
        config = x;
        x = undefined;
        y = undefined;
    }

    var modelX, modelY;
    if (x === undefined) {
        modelX = 0;
        modelY = 0;
    } else {
        var camera = GetValue(config, 'camera', undefined);
        var modelXY = this.getModelXY(x, y, camera, true);
        modelX = modelXY.x;
        modelY = modelXY.y;
    }

    var params = this.getParameters();

    // Eyes
    var eyeBallXWeight = GetValue(config, 'eyeBallX', 1);
    var eyeBallYWeight = GetValue(config, 'eyeBallY', 1);
    params.EyeBallX = modelX * eyeBallXWeight;
    params.EyeBallY = modelY * eyeBallYWeight;

    // Head
    var angleXWeight = GetValue(config, 'angleX', 30);
    var angleYWeight = GetValue(config, 'angleY', 30);
    var angleZWeight = GetValue(config, 'angleZ', 30);
    params.AngleX = modelX * angleXWeight;
    params.AngleY = modelY * angleYWeight;
    params.AngleZ = (-1) * modelX * modelY * angleZWeight;

    // Body
    var bodyAngleXWeight = GetValue(config, 'bodyAngleX', 10);
    params.BodyAngleX = modelX * bodyAngleXWeight;

    return this;
}

export default LookAt;