import { ModalBehavoir, Modal, ModalPromise } from './modal'

export default class ModalPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: ModalBehavoir.IConfig
    ): ModalBehavoir;

    modal: typeof Modal;

    promise: typeof ModalPromise;
}