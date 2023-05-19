import PathFollower from './pathfollower';

export default class PathFollowerPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: PathFollower.IConfig
    ): PathFollower;

}