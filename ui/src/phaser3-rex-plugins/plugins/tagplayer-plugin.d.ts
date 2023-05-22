import TagPlayer from './tagplayer';

export default class TagPlayerPlugin extends Phaser.Plugins.BasePlugin {
    add(
        config?: TagPlayer.IConfig
    ): TagPlayer;

    add(
        scene: Phaser.Scene,
        config?: TagPlayer.IConfig
    ): TagPlayer

}