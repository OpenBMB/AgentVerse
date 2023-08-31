import TextPage from './textpage';

export default class TextPagePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: TextPage.IConfig
    ): TextPage;

}