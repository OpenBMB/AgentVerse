import MergeStyle from './utils/MergeStyle.js';
import Knob from '../../knob/Knob.js';
import CreateChild from './utils/CreateChild.js';

var CreateKnob = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', view, styles, customBuilders);
    CreateChild(scene, data, 'text', view, styles, customBuilders);

    var gameObject = new Knob(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
};

export default CreateKnob;