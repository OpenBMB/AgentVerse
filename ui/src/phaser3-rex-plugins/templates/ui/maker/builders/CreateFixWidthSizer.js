import CreateAnySizer from './utils/CreateAnySizer.js';
import FixWidthSizer from '../../fixwidthsizer/FixWidthSizer.js';

var CreateFixWidthSizer = function (scene, data, view, styles, customBuilders) {
    return CreateAnySizer(scene, data, view, styles, customBuilders, FixWidthSizer);
}

export default CreateFixWidthSizer;