import Interception from './interception';

export default class InterceptionPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Interception.IConfig
    ): Interception;

}