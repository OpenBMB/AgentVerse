import Drag from './drag';

export default class DragPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Drag.IConfig
    ): Drag;

}