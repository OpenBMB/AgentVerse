import Sizer from '../../../sizer/Sizer.js';
import BindingTargetMethods from './BindingTargetMethods.js';
import MonitorTargetMethods from './MonitorTargetMethods.js';
import MinTitleWidthMethods from './MinTitleWidthMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class InputRow extends Sizer {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexTweaker.InputRow';

        this.bindingTarget = undefined;
        this.bindTargetKey = undefined;
        this.autoUpdateEnable = true;

        var inputTitle = config.inputTitle;
        var inputField = config.inputField;
        var background = config.background;

        var proportion = GetValue(config, 'proportion.title', 0);
        var titleSpace = GetValue(config, 'space.title', 0);
        var padding;
        if (this.orientation === 0) {
            padding = { right: titleSpace };
        } else {
            padding = { bottom: titleSpace };
        }
        this.add(
            inputTitle,
            { proportion: proportion, expand: true, padding: padding }
        );

        var defaultProportion = (config.parentOrientation === 1) ? 1 : 0;
        var proportion = GetValue(config, 'proportion.inputField', defaultProportion);
        this.add(
            inputField,
            { proportion: proportion, expand: true, }
        );

        if (background) {
            this.addBackground(background);
        }

        this.addChildrenMap('title', inputTitle);
        this.addChildrenMap('inputField', inputField);
        this.addChildrenMap('background', background);

        this.setupBinding();

    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        this.stopMonitorTarget();

        super.destroy(fromScene);
    }

    setTitle(config) {
        var title = this.childrenMap.title;
        title.setTitle(config);
        return this;
    }

    preLayout() {
        var title = this.childrenMap.title;
        if (title) {
            title.minWidth = 0;
        }

        super.preLayout();
    }
}

Object.assign(
    InputRow.prototype,
    BindingTargetMethods,
    MonitorTargetMethods,
    MinTitleWidthMethods,
)

export default InputRow;