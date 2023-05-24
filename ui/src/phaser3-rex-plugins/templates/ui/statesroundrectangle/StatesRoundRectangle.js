import RoundRectangle from '../roundrectangle/RoundRectangle.js';
import ExtractStyle from './methods/ExtractStyle.js';
import SetStateMethods from './methods/SetStateMethods.js';

class StatesRoundRectangle extends RoundRectangle {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        super(scene, config);

        this.activeStyle = ExtractStyle(config, 'active', PropertiesMap);
        this.hoverStyle = ExtractStyle(config, 'hover', PropertiesMap);
        this.disableStyle = ExtractStyle(config, 'disable', PropertiesMap);
    }

    modifyStyle(style) {
        for (var key in style) {
            this[key] = style[key];
        }
        return this;
    }
}

const PropertiesMap = {
    color: 'fillColor',
    alpha: 'fillAlpha',
    // strokeColor: 'strokeColor',
    // strokeAlpha: 'strokeAlpha',
    strokeWidth: 'lineWidth',
}

Object.assign(
    StatesRoundRectangle.prototype,
    SetStateMethods
)

export default StatesRoundRectangle;