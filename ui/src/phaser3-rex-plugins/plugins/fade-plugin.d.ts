import Fade from './fade';
import FadeOutDestroy from './fade-out-destroy';

export default class FadePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Fade.IConfig
    ): Fade;

    fadeOutDestroy: typeof FadeOutDestroy;
}