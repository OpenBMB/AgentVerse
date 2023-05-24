import DropDownList from '../dropdownlist/DropDownList';
import BuildListConfig from '../utils/build/BuildListConfig';

export default SimpleDropDownList;

declare namespace SimpleDropDownList {
    interface IConfig extends BuildListConfig.IConfig {
    }

    interface ICreatorsConfig extends BuildListConfig.ICreators {
    }
}

declare class SimpleDropDownList extends DropDownList {
    constructor(
        scene: Phaser.Scene,
        config?: SimpleDropDownList.IConfig,
        creators?: SimpleDropDownList.ICreatorsConfig
    );
}