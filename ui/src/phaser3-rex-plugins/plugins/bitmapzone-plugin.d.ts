import BitmapZone from './bitmapzone';

export default class BitmapZonePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: BitmapZone.IConfig
    ): BitmapZone;

}