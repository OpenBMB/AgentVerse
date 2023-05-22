import Base from '../../scrollbar/ScrollBar.js';
import Clone from '../../../../plugins/utils/object/Clone.js'

class Slider extends Base {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        var sliderConfig = Clone(config);
        config = {
            slider: sliderConfig
        }

        // Move orientation parameter from sliderConfig to config
        config.orientation = sliderConfig.orientation;
        delete sliderConfig.orientation;

        // Move background parameter from sliderConfig to config
        config.background = sliderConfig.background;
        delete sliderConfig.background;

        // Move buttons parameter from sliderConfig to config
        config.buttons = sliderConfig.buttons;
        delete sliderConfig.buttons;

        super(scene, config);

        var slider = this.childrenMap.slider;
        this.addChildrenMap('track', slider.childrenMap.track);
        this.addChildrenMap('indicator', slider.childrenMap.indicator);
        this.addChildrenMap('thumb', slider.childrenMap.thumb);
    }
}

export default Slider;