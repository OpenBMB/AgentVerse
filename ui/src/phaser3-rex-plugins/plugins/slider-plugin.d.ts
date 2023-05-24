import Slider from './slider';

export default class SliderPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Slider.IConfig
    ): Slider;

}