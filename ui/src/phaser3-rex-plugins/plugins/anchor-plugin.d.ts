import Anchor from './anchor'

export default class AnchorPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Anchor.IConfig
    ): Anchor;

}