import { CubismFramework, Option } from '../framework/src/live2dcubismframework';

// Invoke this method after loading live2dcubismcore.js, and before loading any model asset.
var Initialize = function (config) {
    if (!window.Live2DCubismCore) {
        console.error('live2dcubismcore.js does not load')
    }

    // Setup cubism
    var option = new Option();
    // TODO: option.logFunction, option.loggingLevel
    CubismFramework.startUp(option);

    // Initialize cubism
    CubismFramework.initialize();

    // TODO: More...
}

export default Initialize;