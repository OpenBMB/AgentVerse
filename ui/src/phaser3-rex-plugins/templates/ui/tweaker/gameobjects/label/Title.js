import Label from '../../../label/Label.js';
import BuildLabelConfig from '../../../utils/build/BuildLabelConfig.js';
import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';

class Title extends Label {
    constructor(scene, config) {
        config = BuildLabelConfig(scene, config);
        super(scene, config);
        this.type = 'rexTweaker.Title';
    }

    setTitle(config) {
        config = (config) ? DeepClone(config) : {};

        if (config.hasOwnProperty('text')) {
            // Do nothing
        } else if (config.hasOwnProperty('title')) {
            config.text = config.title;
        } else {
            config.text = '';
        }

        this.resetDisplayContent(config);

        return this;
    }
}

export default Title;