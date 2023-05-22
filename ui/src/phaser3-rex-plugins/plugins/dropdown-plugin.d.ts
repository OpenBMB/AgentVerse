import DropDown from './dropdown';

export default class DropDownPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: DropDown.IConfig
    ): DropDown;

}