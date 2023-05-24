import MergeStyle from './utils/MergeStyle.js';
import Dialog from '../../dialog/Dialog.js';
import CreateChild from './utils/CreateChild.js';
import CreateChildren from './utils/CreateChildren.js';

var CreateDialog = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', view, styles, customBuilders);
    CreateChild(scene, data, 'toolbarBackground', view, styles, customBuilders);
    CreateChild(scene, data, 'leftToolbarBackground', view, styles, customBuilders);
    CreateChild(scene, data, 'choicesBackground', view, styles, customBuilders);
    CreateChild(scene, data, 'actionsBackground', view, styles, customBuilders);

    CreateChild(scene, data, 'title', view, styles, customBuilders);
    CreateChildren(scene, data, 'toolbar', view, styles, customBuilders);
    CreateChildren(scene, data, 'leftToolbar', view, styles, customBuilders);

    CreateChild(scene, data, 'content', view, styles, customBuilders);
    CreateChild(scene, data, 'description', view, styles, customBuilders);

    CreateChildren(scene, data, 'choices', view, styles, customBuilders);
    CreateChildren(scene, data, 'actions', view, styles, customBuilders);

    var gameObject = new Dialog(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
};

export default CreateDialog;