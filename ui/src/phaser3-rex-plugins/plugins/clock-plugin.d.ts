import Clock from './clock';

export default class ClockPlugin extends Phaser.Plugins.BasePlugin {
    add(
        parent: Phaser.Scene | Phaser.GameObjects.GameObject,
        config?: Clock.IConfig
    ): Clock;

}