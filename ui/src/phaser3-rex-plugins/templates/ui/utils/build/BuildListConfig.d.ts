import DropDownList from '../../dropdownlist/DropDownList';
import BuildLabelConfig from './BuildLabelConfig';

export default BuildListConfig;

declare namespace BuildListConfig {
    interface IConfig extends DropDownList.IConfig {
        label?: BuildLabelConfig.IConfig,
        button?: BuildLabelConfig.IConfig,

        list?: {
            easeIn?: number;
            easeOut?: number;

            wrap?: boolean;
            width?: number;
            height?: number;
            alignParent?: DropDownList.AlignParentType;
            expandDirection?: DropDownList.ExpandDirectionType;
            bounds?: Phaser.Geom.Rectangle;

            space?: DropDownList.ListSpaceType | DropDownList.WrapListSpaceType;

            draggable?: boolean;
        },
    }

    interface ICreators extends BuildLabelConfig.ICreators {
        label?: BuildLabelConfig.ICreators,
        button?: BuildLabelConfig.ICreators,
    }
}

declare function BuildListConfig(
    scene: Phaser.Scene,
    config?: BuildListConfig.IConfig,
    creators?: BuildListConfig.ICreators,
): DropDownList.IConfig