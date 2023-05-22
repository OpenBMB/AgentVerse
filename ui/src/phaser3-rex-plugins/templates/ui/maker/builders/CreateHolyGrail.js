import MergeStyle from './utils/MergeStyle.js';
import HolyGrail from '../../holygrail/HolyGrail.js';
import CreateChild from './utils/CreateChild.js';

var CreateDialog = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', view, styles, customBuilders);
    CreateChild(scene, data, 'content', view, styles, customBuilders);
    CreateChild(scene, data, 'leftSide', view, styles, customBuilders);
    CreateChild(scene, data, 'rightSide', view, styles, customBuilders);
    CreateChild(scene, data, 'header', view, styles, customBuilders);
    CreateChild(scene, data, 'footer', view, styles, customBuilders);

    var gameObject = new HolyGrail(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
};

export default CreateDialog;