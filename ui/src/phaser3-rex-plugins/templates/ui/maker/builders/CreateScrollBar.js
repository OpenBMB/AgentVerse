import MergeStyle from './utils/MergeStyle.js';
import ScrollBar from '../../scrollbar/ScrollBar.js';
import CreateChild from './utils/CreateChild.js';
import ReplaceSliderConfig from './utils/ReplaceSliderConfig.js';

var CreateScrollBar = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', view, styles, customBuilders);
    ReplaceSliderConfig(scene, data.slider, view, styles, customBuilders);

    var buttonsConfig = data.buttons;
    if (buttonsConfig) {
        CreateChild(scene, buttonsConfig, 'top', view, styles, customBuilders);
        CreateChild(scene, buttonsConfig, 'bottom', view, styles, customBuilders);
        CreateChild(scene, buttonsConfig, 'left', view, styles, customBuilders);
        CreateChild(scene, buttonsConfig, 'right', view, styles, customBuilders);
    }

    var gameObject = new ScrollBar(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
};

export default CreateScrollBar;