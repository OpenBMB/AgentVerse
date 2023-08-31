import LifeTime from './lifetime';

export default class LifeTimePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: LifeTime.IConfig
    ): LifeTime;

}