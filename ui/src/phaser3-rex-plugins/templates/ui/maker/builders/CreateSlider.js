import MergeStyle from './utils/MergeStyle.js';
import Slider from '../../slider/Slider.js';
import CreateChild from './utils/CreateChild.js';

var CreateSlider = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', view, styles, customBuilders);
    CreateChild(scene, data, 'track', view, styles, customBuilders);
    CreateChild(scene, data, 'indicator', view, styles, customBuilders);
    CreateChild(scene, data, 'thumb', view, styles, customBuilders);

    var gameObject = new Slider(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
};

export default CreateSlider;