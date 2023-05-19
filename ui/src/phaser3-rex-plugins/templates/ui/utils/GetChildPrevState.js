import GetSizerConfig from './GetSizerConfig.js';

var GetChildPrevState = function (child) {
    var childConfig = GetSizerConfig(child);
    if (!childConfig.hasOwnProperty('prevState')) {
        childConfig.prevState = {};
    }
    return childConfig.prevState;
}

export default GetChildPrevState;
