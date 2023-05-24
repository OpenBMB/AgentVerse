import MouseWheelScroller from './mousewheelscroller';

export default class MouseWheelScrollerPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: MouseWheelScroller.IConfig
    ): MouseWheelScroller;

}