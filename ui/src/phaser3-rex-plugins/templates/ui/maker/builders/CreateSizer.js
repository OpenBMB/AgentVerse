import CreateAnySizer from './utils/CreateAnySizer.js';
import Sizer from '../../sizer/Sizer.js';

var CreateSizer = function (scene, data, view, styles, customBuilders) {
    return CreateAnySizer(scene, data, view, styles, customBuilders, Sizer);
}

export default CreateSizer;