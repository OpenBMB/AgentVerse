import Label from '../label/Label';
import BuildLabelConfig from '../utils/build/BuildLabelConfig';

export default SimpleLabel;

declare namespace SimpleLabel {
    interface IConfig extends BuildLabelConfig.IConfig {
    }

    interface ICreatorsConfig extends BuildLabelConfig.ICreators {
    }
}

declare class SimpleLabel extends Label {
    constructor(
        scene: Phaser.Scene,
        config?: SimpleLabel.IConfig,
        creators?: SimpleLabel.ICreatorsConfig
    );

    setActiveState(enable?: boolean): this;
    setHoverState(enable?: boolean): this;
    setDisableState(enable?: boolean): this;
}