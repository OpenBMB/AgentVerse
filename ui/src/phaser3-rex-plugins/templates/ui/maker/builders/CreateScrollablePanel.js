import MergeStyle from './utils/MergeStyle.js';
import ScrollablePanel from '../../scrollablepanel/ScrollablePanel.js';
import CreateChild from './utils/CreateChild.js';
import ReplaceSliderConfig from './utils/ReplaceSliderConfig.js';

var CreateScrollablePanel = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', view, styles, customBuilders);

    var panelConfig = data.panel;
    if (panelConfig) {
        CreateChild(scene, panelConfig, 'child', view, styles, customBuilders);
    }

    var sliderConfig = data.slider;
    if (sliderConfig) {
        ReplaceSliderConfig(scene, data.slider, view, styles, customBuilders);

        var sliderButtonsConfig = sliderConfig.buttons;
        if (sliderButtonsConfig) {
            CreateChild(scene, sliderButtonsConfig, 'top', view, styles, customBuilders);
            CreateChild(scene, sliderButtonsConfig, 'bottom', view, styles, customBuilders);
            CreateChild(scene, sliderButtonsConfig, 'left', view, styles, customBuilders);
            CreateChild(scene, sliderButtonsConfig, 'right', view, styles, customBuilders);
        }
    }

    CreateChild(scene, data, 'header', styles, customBuilders);
    CreateChild(scene, data, 'footer', styles, customBuilders);

    var gameObject = new ScrollablePanel(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
};

export default CreateScrollablePanel;