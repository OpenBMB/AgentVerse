import GetBoundsConfig from '../utils/GetBoundsConfig.js';
import AddChild from './utils/AddChild.js';

export default {
    addBackground(gameObject, paddingConfig, childKey) {
        if (this.backgroundChildren === undefined) {
            this.backgroundChildren = [];
        }

        if (typeof (paddingConfig) === 'string') {
            childKey = paddingConfig;
            paddingConfig = undefined;
        }

        if (paddingConfig === undefined) {
            paddingConfig = 0;
        }

        AddChild.call(this, gameObject);
        this.backgroundChildren.push(gameObject);

        var config = this.getSizerConfig(gameObject);
        config.padding = GetBoundsConfig(paddingConfig);

        if (childKey !== undefined) {
            this.addChildrenMap(childKey, gameObject)
        }
        return this;
    },

    isBackground(gameObject) {
        if (this.backgroundChildren === undefined) {
            return false;
        }
        return (this.backgroundChildren.indexOf(gameObject) !== -1);
    }
}