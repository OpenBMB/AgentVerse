import Button from './button';

export default class ButtonPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Button.IConfig
    ): Button;

}