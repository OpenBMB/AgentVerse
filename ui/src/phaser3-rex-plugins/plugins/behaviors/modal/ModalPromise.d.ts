import ModalBehavior from './Modal';

export function Modal(
    gameObject: Phaser.GameObjects.GameObject,
    config?: ModalBehavior.IConfig
): ModalBehavior;

export function ModalPromise(
    gameObject: Phaser.GameObjects.GameObject,
    config?: ModalBehavior.IConfig
): Promise<any>

export function ModalClose(
    gameObject: Phaser.GameObjects.GameObject,
    closeEventData?: unknown
): void;

export { ModalBehavior };