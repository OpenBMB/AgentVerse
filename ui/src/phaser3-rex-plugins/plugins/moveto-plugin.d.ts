import MoveTo from './moveto';

export default class MoveToPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: MoveTo.IConfig
    ): MoveTo;

}