import MergeStyle from './utils/MergeStyle.js';
import NumberBar from '../../numberbar/NumberBar.js';
import CreateChild from './utils/CreateChild.js';
import ReplaceSliderConfig from './utils/ReplaceSliderConfig.js';

var CreateNumberBar = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', view, styles, customBuilders);
    CreateChild(scene, data, 'icon', view, styles, customBuilders);
    ReplaceSliderConfig(scene, data.slider, view, styles, customBuilders);
    CreateChild(scene, data, 'text', view, styles, customBuilders);

    var gameObject = new NumberBar(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
};

export default CreateNumberBar;