import RoundRectangle from '../../../roundrectangle/RoundRectangle.js';
import IsGameObject from '../../../../../plugins/utils/system/IsGameObject.js';

var CreateSwatch = function (scene, config) {
    if (config === false) {
        return null;
    } else if (IsGameObject(config)) {
        return config;
    }

    var swatch = new RoundRectangle(scene, config);
    scene.add.existing(swatch);
    return swatch;
}

export default CreateSwatch;