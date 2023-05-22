import MergeStyle from './utils/MergeStyle.js';
import FixWidthButtons from '../../fixwidthbuttons/FixWidthButtons.js';
import CreateChild from './utils/CreateChild.js';
import CreateChildren from './utils/CreateChildren.js';

var CreateFixWidthButtons = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', view, styles, customBuilders);
    CreateChildren(scene, data, 'buttons', view, styles, customBuilders);

    var gameObject = new FixWidthButtons(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
};

export default CreateFixWidthButtons;