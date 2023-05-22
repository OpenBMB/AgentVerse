import Boids from './boids';

export default class BoidsPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Boids.IConfig
    ): Boids;

}