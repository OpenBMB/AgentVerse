import CreateChild from './CreateChild.js';

var ReplaceSliderConfig = function (scene, sliderConfig, view, styles, customBuilders) {
    if (sliderConfig) {
        CreateChild(scene, sliderConfig, 'background', view, styles, customBuilders);
        CreateChild(scene, sliderConfig, 'track', view, styles, customBuilders);
        CreateChild(scene, sliderConfig, 'indicator', view, styles, customBuilders);
        CreateChild(scene, sliderConfig, 'thumb', view, styles, customBuilders);
    }

    return sliderConfig;
}

export default ReplaceSliderConfig;