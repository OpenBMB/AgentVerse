import MergeStyle from './utils/MergeStyle.js';
import GridButtons from '../../gridbuttons/GridButtons.js';
import CreateChild from './utils/CreateChild.js';
import CreateChildren from './utils/CreateChildren.js';
import Make from '../Make.js';

var CreateGridButtons = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', view, styles, customBuilders);

    var buttonsConfig = data.buttons;  // Game objects in 2d array
    if (buttonsConfig) {
        for (var i = 0, cnt = buttonsConfig.length; i < cnt; i++) {
            CreateChildren(scene, buttonsConfig, i, view, styles, customBuilders);
        }
    }

    // Build createCellContainerCallback
    var createCellContainerCallbackConfig = data.createCellContainerCallback;
    if (createCellContainerCallbackConfig) {
        var childData = createCellContainerCallbackConfig.$child;
        delete createCellContainerCallbackConfig.$child;

        data.createCellContainerCallback = function (scene, x, y, config) {
            var child = Make(scene, childData, view, styles, customBuilders);

            // Copy config
            for (var key in createCellContainerCallbackConfig) {
                config[key] = createCellContainerCallbackConfig[key];
            }

            return child;
        }
    }

    var gameObject = new GridButtons(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
};

export default CreateGridButtons;