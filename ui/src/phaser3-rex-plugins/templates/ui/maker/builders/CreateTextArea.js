import MergeStyle from './utils/MergeStyle.js';
import TextArea from '../../textarea/TextArea.js';
import CreateChild from './utils/CreateChild.js';
import ReplaceSliderConfig from './utils/ReplaceSliderConfig.js';

var CreateTextArea = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', view, styles, customBuilders);
    CreateChild(scene, data, 'text', view, styles, customBuilders);
    ReplaceSliderConfig(scene, data.slider, view, styles, customBuilders);
    CreateChild(scene, data, 'header', view, styles, customBuilders);
    CreateChild(scene, data, 'footer', view, styles, customBuilders);

    var gameObject = new TextArea(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
};

export default CreateTextArea;