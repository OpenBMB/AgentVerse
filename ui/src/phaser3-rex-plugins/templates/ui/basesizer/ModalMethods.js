import { Modal, ModalClose } from '../modal/Modal.js';
import IsFunction from '../../../plugins/utils/object/IsFunction.js';

export default {
    // Override
    // onCreateModalBehavior(self, config) { },

    modal(config, onClose) {
        if (IsFunction(config)) {
            onClose = config;
            config = undefined;
        }

        if (this._modalBehavior === undefined) {
            if (this.onCreateModalBehavior) {
                this.onCreateModalBehavior(this, config);
            }
            this._modalBehavior = Modal(this, config);
        }

        if (onClose) {
            this._modalBehavior.once('close', onClose);
        }

        this._modalBehavior.requestOpen();

        return this;
    },

    modalPromise(config) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.modal(config, resolve);
        });
    },

    modalClose(closeEventData) {
        ModalClose(this, closeEventData);
        return this;
    }
}