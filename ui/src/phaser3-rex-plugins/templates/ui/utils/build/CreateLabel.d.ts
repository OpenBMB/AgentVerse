import SimpleLabel from '../../simplelabel/SimpleLabel.js';

export default CreateLabel;

declare namespace CreateLabel {
    interface IConfig extends SimpleLabel.IConfig {

    }

    interface ICreatorsConfig extends SimpleLabel.ICreatorsConfig {

    }
}

declare function CreateLabel(
    scene: Phaser.Scene,
    config?: SimpleLabel.IConfig,
    creators?: SimpleLabel.ICreatorsConfig,
): SimpleLabel;