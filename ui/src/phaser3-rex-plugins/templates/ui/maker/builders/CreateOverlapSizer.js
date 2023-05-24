import CreateAnySizer from './utils/CreateAnySizer.js';
import OverlapSizer from '../../overlapsizer/OverlapSizer.js';

var CreateOverlapSizer = function (scene, data, view, styles, customBuilders) {
    return CreateAnySizer(scene, data, view, styles, customBuilders, OverlapSizer);
}

export default CreateOverlapSizer;