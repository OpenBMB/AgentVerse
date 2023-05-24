import MergeStyle from './utils/MergeStyle.js';
import Buttons from '../../buttons/Buttons.js';
import CreateChild from './utils/CreateChild.js';
import CreateChildren from './utils/CreateChildren.js';

var CreateButtons = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', view, styles, customBuilders);
    CreateChildren(scene, data, 'buttons', view, styles, customBuilders);

    var gameObject = new Buttons(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
};

export default CreateButtons;