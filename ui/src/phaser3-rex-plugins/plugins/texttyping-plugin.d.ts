import TextTyping from './texttyping';

export default class TextTypingPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: TextTyping.IConfig
    ): TextTyping;

}