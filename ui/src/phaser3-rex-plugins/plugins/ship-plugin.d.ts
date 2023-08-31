import Ship from './moveto';

export default class ShipPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Ship.IConfig
    ): Ship;

}