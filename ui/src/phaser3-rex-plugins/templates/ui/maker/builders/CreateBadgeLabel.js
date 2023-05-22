import MergeStyle from './utils/MergeStyle.js';
import BadgeLabel from '../../badgelabel/BadgeLabel.js';
import CreateChild from './utils/CreateChild.js';

var CreateBadgeLabel = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', view, styles, customBuilders);
    CreateChild(scene, data, 'main', view, styles, customBuilders);
    CreateChild(scene, data, 'leftTop', view, styles, customBuilders);
    CreateChild(scene, data, 'centerTop', view, styles, customBuilders);
    CreateChild(scene, data, 'rightTop', view, styles, customBuilders);
    CreateChild(scene, data, 'leftCenter', view, styles, customBuilders);
    CreateChild(scene, data, 'center', view, styles, customBuilders);
    CreateChild(scene, data, 'rightCenter', view, styles, customBuilders);
    CreateChild(scene, data, 'leftBottom', view, styles, customBuilders);
    CreateChild(scene, data, 'centerBottom', view, styles, customBuilders);
    CreateChild(scene, data, 'rightBottom', view, styles, customBuilders);

    var gameObject = new BadgeLabel(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateBadgeLabel;