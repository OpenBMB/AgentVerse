import DragRotate from './dragrotate';

export default class DragRotatePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: DragRotate.IConfig
    ): DragRotate;

}