import CreateAnyLabel from './utils/CreateAnyLabel.js';
import Toast from '../../toast/Toast.js';

var CreateToast = function (scene, data, view, styles, customBuilders) {
    return CreateAnyLabel(scene, data, view, styles, customBuilders, Toast);
}

export default CreateToast;