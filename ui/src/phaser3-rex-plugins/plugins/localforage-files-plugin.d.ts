import Files from './localforage-files';

export default class LocalForageFilesPlugin extends Phaser.Plugins.BasePlugin {
    add(
        config?: Files.IConfig
    ): Files;

}