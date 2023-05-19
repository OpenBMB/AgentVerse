import IsFunction from '../../../../plugins/utils/object/IsFunction.js';
import ModalMethods from '../../basesizer/ModalMethods.js';

var Modal = function (config, onClose) {
    if (IsFunction(config)) {
        onClose = config;
        config = undefined;
    }

    if (config === undefined) {
        config = {};
    }

    var zeroButtonMode = (this.buttonMode === 0);

    if (!config.hasOwnProperty('anyTouchClose')) {
        config.anyTouchClose = zeroButtonMode;
    }

    if (!config.hasOwnProperty('manualClose')) {
        config.manualClose = !zeroButtonMode;
    }

    ModalMethods.modal.call(this, config, onClose);

    return this;
}

export default Modal;