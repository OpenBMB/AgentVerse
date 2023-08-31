import StatesRoundRectangle from '../../statesroundrectangle/StatesRoundRectangle';

export default CreateBackground;

declare namespace CreateBackground {
    interface IConfig extends StatesRoundRectangle.IConfig {

    }
}

declare function CreateBackground(
    scene: Phaser.Scene,
    config?: CreateBackground.IConfig
): StatesRoundRectangle