import Flip from './flip';

export default class FlipPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Flip.IConfig
    ): Flip;

}