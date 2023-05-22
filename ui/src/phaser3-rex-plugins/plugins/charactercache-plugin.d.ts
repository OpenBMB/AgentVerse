import CharacterCache from './charactercache';

export default class CharacterCachePlugin extends Phaser.Plugins.BasePlugin {
    add(
        scene: Phaser.Scene,
        config: CharacterCache.IConfig
    ): CharacterCache;

}