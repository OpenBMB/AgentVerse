import BaseShapes from '../shapes/BaseShapes.js';
import ShapesUpdateMethods from './ShapesUpdateMethods.js';
import WorldXYToGameObjectLocalXY from '../../../utils/position/WorldXYToGameObjectLocalXY.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class CustomShapes extends BaseShapes {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 2);
            height = GetValue(config, 'height', 2);
        }

        super(scene, x, y, width, height);
        this.type = GetValue(config, 'type', 'rexCustomShapes');
        this.buildShapes(config);
    }

    get centerX() {
        return this.width / 2;
    }

    get centerY() {
        return this.height / 2;
    }

    worldToLocalXY(worldX, worldY, camera, out) {
        if (typeof (camera) === 'boolean') {
            out = camera;
            camera = undefined;
        }

        return WorldXYToGameObjectLocalXY(this, worldX, worldY, camera, out);
    }
}

Object.assign(
    CustomShapes.prototype,
    ShapesUpdateMethods
);

export default CustomShapes;