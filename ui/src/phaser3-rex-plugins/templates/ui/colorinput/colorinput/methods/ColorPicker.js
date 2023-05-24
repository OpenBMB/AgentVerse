import Sizer from '../../../sizer/Sizer.js';
import ColorPicker from '../../colorpicker/ColorPicker.js';
import ColorComponents from '../../colorcomponents/ColorComponents.js';
import TouchEventStop from '../../../toucheventstop/TouchEventStop.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ColorPickerPanel extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        config.orientation = 1;
        super(scene, config);
        this.type = 'rexColorInput.ColorPickerPanel';

        // Add elements
        var background = GetValue(config, 'background', undefined);

        var colorPicker = new ColorPicker(scene, {
            hPalette: config.hPalette || {},
            svPalette: config.svPalette || {},
            space: {
                item: GetValue(config, 'space.hPalette', 8)
            }
        });
        scene.add.existing(colorPicker);

        var colorComponents;
        if (config.colorComponents) {
            colorComponents = new ColorComponents(scene, config.colorComponents);
            scene.add.existing(colorComponents);
        }

        if (background) {
            this.addBackground(background);
            var touchEventStop = new TouchEventStop(background, {
                stopAllLevels: false,
            });
        }

        this.add(
            colorPicker,
            { proportion: 1, expand: true }
        );

        if (colorComponents) {
            this.add(
                colorComponents,
                { proportion: 0, expand: true }
            );
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('colorPicker', colorPicker);
        this.addChildrenMap('colorComponents', colorComponents);

        colorPicker.on('valuechange', function (value) {
            this.setValue(value);
        }, this)

        if (colorComponents) {
            colorComponents.on('valuechange', function (value) {
                this.setValue(value);
            }, this)
        }

        this.setValue(GetValue(config, 'value', 0xffffff));
    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (this._value === value) {
            return;
        }

        this._value = value;

        var colorPicker = this.childrenMap.colorPicker;
        colorPicker.setValue(value);

        var colorComponents = this.childrenMap.colorComponents;
        if (colorComponents) {
            colorComponents.setValue(value);
        }

        this.emit('valuechange', value);
    }

    setValue(value) {
        this.value = value;
        return this;
    }

}

export default ColorPickerPanel;