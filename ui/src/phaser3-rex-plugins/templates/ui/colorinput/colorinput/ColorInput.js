import ColorInputBase from '../colorinputbase/ColorInputBase.js';
import Methods from './methods/Methods.js';
import CreateBackground from '../../utils/build/CreateBackground.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ColorInput extends ColorInputBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        this.type = 'rexColorInput';

        if (!config.hasOwnProperty('colorPicker')) {
            config.colorPicker = {
                background: { color: 0x0 }
            }
        }

        var colorPickerConfig = config.colorPicker;
        var hasColorPicker = (colorPickerConfig !== false) && (colorPickerConfig !== null);

        if (hasColorPicker) {
            this.setColorPickerSize(
                GetValue(colorPickerConfig, 'width', 160),
                GetValue(colorPickerConfig, 'height', 170)
            );

            var createBackgroundCallback;
            var background = GetValue(colorPickerConfig, 'background');
            if (background) {
                createBackgroundCallback = function (scene) {
                    return CreateBackground(scene, background);
                }
            } else {
                createBackgroundCallback = GetValue(colorPickerConfig, 'createBackgroundCallback');
            }
            this.setCreateColorPickerBackgroundCallback(createBackgroundCallback);

            this.setColorPickerHPalettePosition(GetValue(colorPickerConfig, 'hPalettePosition', 0));
            this.setColorPickerExpandDirection(GetValue(colorPickerConfig, 'expandDirection'));
            this.setColorPickerEaseInDuration(GetValue(colorPickerConfig, 'easeIn', 200));
            this.setColorPickerEaseOutDuration(GetValue(colorPickerConfig, 'easeOut', 200));
            this.setColorPickerTransitInCallback(GetValue(colorPickerConfig, 'transitIn'));
            this.setColorPickerTransitOutCallback(GetValue(colorPickerConfig, 'transitOut'));
            this.setColorPickerBounds(GetValue(colorPickerConfig, 'bounds'));

            var colorPickerSpaceConfig = GetValue(colorPickerConfig, 'space');
            if (colorPickerSpaceConfig === undefined) {
                colorPickerSpaceConfig = { left: 10, right: 10, top: 10, bottom: 10, item: 8 }
            }
            this.setColorPickerSpace(colorPickerSpaceConfig);
        }

        var colorComponentsConfig = config.colorComponents;
        var hasColorComponents = (colorComponentsConfig !== false) && (colorComponentsConfig !== null);
        if (hasColorPicker && hasColorComponents) {
            this.setColorComponentsHeight(GetValue(colorComponentsConfig, 'height', 30));

            this.setColorComponentsFormatLabelConfig(GetValue(colorComponentsConfig, 'formatLabel'));

            var colorComponentsInputTextConfig = GetValue(colorComponentsConfig, 'inputText');
            if (!colorComponentsInputTextConfig) {
                colorComponentsInputTextConfig = GetValue(config, 'inputText');
            }
            this.setColorComponentsInputTextConfig(colorComponentsInputTextConfig);

            var colorComponentsSpace = GetValue(colorComponentsConfig, 'space');
            if (colorComponentsSpace === undefined) {
                colorComponentsSpace = { item: 8 }
            }
            this.setColorComponentsSpace(colorComponentsSpace);
        }



        var swatch = this.childrenMap.swatch;
        if (swatch && hasColorPicker) {
            this.onClick(swatch, this.openColorPicker, this);
        }
    }
}

Object.assign(
    ColorInput.prototype,
    Methods,
)

export default ColorInput;