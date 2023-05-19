import { ModalBehavoir, Modal, ModalPromise, ModalClose } from './modal.js'

class ModalPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new ModalBehavoir(gameObject, config);
    }

    modal(gameObject, config) {
        return Modal(gameObject, config);
    }

    promise(gameObject, config) {
        return ModalPromise(gameObject, config);
    }

    close(gameObject, closeEventData) {
        return ModalClose(gameObject, closeEventData);
    }
}

export default ModalPlugin;