import EightDirection from './eightdirection';

export default class EightDirectionPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: EightDirection.IConfig
    ): EightDirection;

}