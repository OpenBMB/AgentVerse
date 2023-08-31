import MergeStyle from './utils/MergeStyle.js';
import Menu from '../../menu/Menu.js';
import Make from '../Make.js';
import DeepClone from '../../../../plugins/utils/object/DeepClone.js';

var CreateMenu = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    var backgroundConfig = data.background;
    delete data.background;
    if (backgroundConfig) {
        data.createBackgroundCallback = function (items) {
            var scene = items.scene;
            var gameObject = Make(scene, DeepClone(backgroundConfig), view, styles, customBuilders);
            return gameObject;
        }
    }

    data.createButtonCallback = function (item, index, items) {
        // Don't deep-clone scene and $next properties
        var scene = item.scene;
        var $next = item.$next;
        delete item.scene;
        delete item.$next;

        var gameObject = Make(scene, DeepClone(item), view, styles, customBuilders);

        // Add scene, $next properties back
        item.scene = scene;
        item.$next = $next;

        return gameObject;
    }

    data.childrenKey = '$next';

    var gameObject = new Menu(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
};

export default CreateMenu;