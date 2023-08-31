import CreateBackgroundBase from '../../utils/build/CreateBackground.js';

var CreateBackground = function (scene, config, style) {
    // TODO: Might create nine-slice as background
    return CreateBackgroundBase(scene, style);
}

export default CreateBackground;