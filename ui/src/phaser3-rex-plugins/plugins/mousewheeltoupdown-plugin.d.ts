import MouseWheelToUpDown from './mousewheeltoupdown';

export default class MouseWheelToUpDownPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: MouseWheelToUpDown.IConfig
    ): MouseWheelToUpDown;

}