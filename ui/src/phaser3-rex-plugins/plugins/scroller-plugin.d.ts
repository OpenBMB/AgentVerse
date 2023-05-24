import Scroller from './scroller';

export default class ScrollerPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Scroller.IConfig
    ): Scroller;

}