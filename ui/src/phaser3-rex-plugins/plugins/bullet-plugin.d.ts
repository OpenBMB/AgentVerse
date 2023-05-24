import Bullet from './bullet';

export default class BulletPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Bullet.IConfig
    ): Bullet;

}