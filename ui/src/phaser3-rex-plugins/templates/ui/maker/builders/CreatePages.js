import CreateAnySizer from './utils/CreateAnySizer.js';
import Pages from '../../pages/Pages.js';

var CreatePages = function (scene, data, view, styles, customBuilders) {
    return CreateAnySizer(scene, data, view, styles, customBuilders, Pages);
}

export default CreatePages;