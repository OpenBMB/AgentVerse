import Shake from './shakeposition';

export default class ShakePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Shake.IConfig
    ): Shake;

}