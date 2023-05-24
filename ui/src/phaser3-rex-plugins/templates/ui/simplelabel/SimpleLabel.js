import Label from '../label/Label.js';
import BuildLabelConfig from '../utils/build/BuildLabelConfig.js';

class SimpleLabel extends Label {
    constructor(scene, config, creators) {
        config = BuildLabelConfig(scene, config, creators);
        super(scene, config);
        this.type = 'rexSimpleLabel';
    }

    setActiveState(enable) {
        var background = this.childrenMap.background;
        if (background && background.setActiveState) {
            background.setActiveState(enable);
        }
        return this;
    }

    setHoverState(enable) {
        var background = this.childrenMap.background;
        if (background && background.setHoverState) {
            background.setHoverState(enable);
        }
        return this;
    }

    setDisableState(enable) {
        var background = this.childrenMap.background;
        if (background && background.setDisableState) {
            background.setDisableState(enable);
        }
        return this;
    }

}

export default SimpleLabel;