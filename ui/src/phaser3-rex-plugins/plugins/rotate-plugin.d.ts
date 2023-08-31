import Rotate from './rotate';

export default class RotatePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Rotate.IConfig
    ): Rotate;

}