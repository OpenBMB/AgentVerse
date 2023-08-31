import ClickOutside from './clickoutside';

export default class ClickOutsidePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: ClickOutside.IConfig
    ): ClickOutside;

}