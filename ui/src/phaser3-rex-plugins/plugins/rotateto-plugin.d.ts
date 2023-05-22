import RotateTo from './rotateto';

export default class RotateToPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: RotateTo.IConfig
    ): RotateTo;

}