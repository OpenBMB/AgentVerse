import ColorPicker from './ColorPicker.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateColorPicker = function (scene) {
    var scene = this.scene;

    var background;
    var createBackgroundCallback = this.colorPickerCreateBackgroundCallback;
    if (createBackgroundCallback) {
        background = createBackgroundCallback.call(this, scene);
        scene.add.existing(background);
    }

    var width = this.colorPickerWidth;
    if (width === undefined) {
        width = this.width;
    }

    var height = this.colorPickerHeight;
    if (height === undefined) {
        height = width;
    }

    var colorComponentsConfig;
    if (this.colorComponentsHeight > 0) {
        colorComponentsConfig = {
            height: this.colorComponentsHeight,
            formatLabel: this.colorComponentsFormatLabelConfig,
            inputText: this.colorComponentsInputTextConfig,
            space: this.colorComponentsSpace,
        }
    } else {
        colorComponentsConfig = false;
    }

    var colorPicker = new ColorPicker(scene, {
        width: width, height: height,

        background: background,
        space: this.colorPickerSpace,

        hPalette: {
            position: this.colorPickerHPalettePosition,
        },

        colorComponents: colorComponentsConfig,

        value: this.value
    });
    scene.add.existing(colorPicker);

    return colorPicker;
}

export default CreateColorPicker;