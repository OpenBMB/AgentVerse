import ConfigurationMethods from './ConfigurationMethods.js'
import OpenColorPicker from './OpenColorPicker.js';

var methods = {
    openColorPicker: OpenColorPicker
}

Object.assign(
    methods,
    ConfigurationMethods,
);

export default methods;