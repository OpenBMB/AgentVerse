import DelayCallMethods from './DelayCallMethods.js';
import ConfigurationMethods from './ConfigurationMethods.js';
import OpenMethods from './OpenMethods.js';
import CloseMethods from './CloseMethods.js';

var methods = {};

Object.assign(
    methods,
    DelayCallMethods,
    ConfigurationMethods,
    OpenMethods,
    CloseMethods,
)

export default methods;