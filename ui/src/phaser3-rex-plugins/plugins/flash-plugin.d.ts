import Flash from './flash';

export default class FlashPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Flash.IConfig
    ): Flash;

}