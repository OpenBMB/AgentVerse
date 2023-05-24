import Sizer from '../sizer/Sizer.js';
import Methods from './methods/Methods.js';
import CreateBackground from './builders/CreateBackground.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TweakerShell extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        if (config.orientation === undefined) {
            config.orientation = 1;
        }

        // Create sizer
        super(scene, config);
        this.type = 'rexTweakerShell';

        this.root = config.root || this;

        this.styles = GetValue(config, 'styles') || {};
        this.styles.orientation = this.orientation;

        this.itemWidth = GetValue(this.styles, 'itemWidth', 0);

        if ((this.root === this) && (this.orientation === 1)) {
            var alignTitle = GetValue(config, 'inputRow.alignTitle');
            if (alignTitle === undefined) {
                var titleProportion = GetValue(this.styles, 'inputRow.proportion.title');
                alignTitle = (!titleProportion);

            } else {
                if (alignTitle) {  // Override title proportion to 0
                    SetValue(this.styles, 'inputRow.proportion.title', 0);
                }

            }
            this.alignInputRowTitle = alignTitle;
        } else {
            this.alignInputRowTitle = false;
        }


        var background = CreateBackground(scene, undefined, config.background);
        if (background) {
            this.addBackground(background);
        }
    }

    preLayout() {
        super.preLayout();

        if (this.alignInputRowTitle) {
            this.setInputRowTitleWidth(this.getMaxInputRowTitleWidth());
        }
    }

}

Object.assign(
    TweakerShell.prototype,
    Methods
);

export default TweakerShell;