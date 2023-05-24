import MergeStyle from './MergeStyle.js';
import CreateChild from './CreateChild.js';

var CreateAnyLabel = function (scene, data, view, styles, customBuilders, LabelClass) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', view, styles, customBuilders);
    CreateChild(scene, data, 'icon', view, styles, customBuilders);
    CreateChild(scene, data, 'text', view, styles, customBuilders);
    CreateChild(scene, data, 'action', view, styles, customBuilders);

    var gameObject = new LabelClass(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateAnyLabel;