import TouchEventStop from './toucheventstop';

export default class TouchEventStopPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: TouchEventStop.IConfig
    ): TouchEventStop;

}