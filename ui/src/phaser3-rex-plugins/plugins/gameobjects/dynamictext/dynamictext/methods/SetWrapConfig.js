import DeepClone from '../../../../utils/object/DeepClone.js';

var SetWrapConfig = function (config) {
    if (config === undefined) {
        config = {};
    } else if (typeof (config) === 'object') {
        config = DeepClone(config);
    }

    this.wrapConfig = config;
    return this;
}

export default SetWrapConfig;