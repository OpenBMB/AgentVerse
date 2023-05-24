import Sizer from '../../sizer/Sizer.js';
import HPalette from './methods/HPalette.js';
import SVPalette from './methods/SVPalette.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ColorPicker extends Sizer {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexColorPicker';
        this.freezePalettes = false;

        // orientation
        var hPalettePosition = GetValue(config, 'hPalette.position', 0);
        if (typeof (hPalettePosition) === 'string') {
            hPalettePosition = HPalettePositionNamesMap[hPalettePosition];
        }
        var orientation = (
            (hPalettePosition === 0) ||  // bottom
            (hPalettePosition === 2)     // top
        ) ? 1 :  // y
            0;   // x
        this.setOrientation(orientation)

        // Add elements
        var background = GetValue(config, 'background', undefined);

        var hPaletteWidth, hPaletteHeight;
        if (this.orientation === 0) {
            var hPaletteWidth = GetValue(config, 'hPalette.width', undefined);
            if (hPaletteWidth === undefined) {
                hPaletteWidth = GetValue(config, 'hPalette.size', 10);
            }
        } else {
            hPaletteHeight = GetValue(config, 'hPalette.height', undefined);
            if (hPaletteHeight === undefined) {
                hPaletteHeight = GetValue(config, 'hPalette.size', 10);
            }
        }

        var hPalette = new HPalette(scene, {
            width: hPaletteWidth,
            height: hPaletteHeight
        });
        scene.add.existing(hPalette);

        var svPaletteWidth = GetValue(config, 'svPalette.width', undefined);
        var svPaletteHeight = GetValue(config, 'svPalette.height', undefined);

        var svPalette = new SVPalette(scene, {
            width: svPaletteWidth,
            height: svPaletteHeight
        });
        scene.add.existing(svPalette);

        if (background) {
            this.addBackground(background);
        }

        var hPaletteAddConfig = {
            proportion: 0, expand: true
        }

        var svPaletteProportion, svPaletteExpand;
        if (this.orientation === 0) {
            svPaletteProportion = (svPaletteWidth === undefined) ? 1 : 0;
            svPaletteExpand = (svPaletteHeight === undefined) ? true : false;
        } else {
            svPaletteProportion = (svPaletteHeight === undefined) ? 1 : 0;
            svPaletteExpand = (svPaletteWidth === undefined) ? true : false;
        }
        var svPaletteAddConfig = {
            proportion: svPaletteProportion, expand: svPaletteExpand
        }

        if ((hPalettePosition === 0) || (hPalettePosition === 3)) {  // bottom, right
            this
                .add(svPalette, svPaletteAddConfig)
                .add(hPalette, hPaletteAddConfig)
        } else {  // left, top
            this
                .add(hPalette, hPaletteAddConfig)
                .add(svPalette, svPaletteAddConfig)
        }

        hPalette
            .on('input', function () {
                svPalette.setHue(hPalette.getHue());
                this.setValue(svPalette.color, true);
            }, this)

        svPalette
            .on('input', function () {
                this.setValue(svPalette.color, true);
            }, this)

        this.addChildrenMap('background', background);
        this.addChildrenMap('hPalette', hPalette);
        this.addChildrenMap('svPalette', svPalette);

        var callback = GetValue(config, 'valuechangeCallback', null);
        if (callback !== null) {
            var scope = GetValue(config, 'valuechangeCallbackScope', undefined);
            this.on('valuechange', callback, scope);
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

        var oldValue = this._value;
        this._value = value;

        if (!this.freezePalettes) {
            this.updatePalettes();
        }

        this.emit('valuechange', value, oldValue, this);
    }

    setValue(value, freezePalettes) {
        this.freezePalettes = !!freezePalettes;
        this.value = value;
        this.freezePalettes = false;
        return this;
    }

    get color() {
        return this._value;
    }

    set color(color) {
        this.value = color;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    updatePalettes() {
        this.childrenMap.hPalette.setColor(this.color);
        this.childrenMap.svPalette.setColor(this.color);
        return this;
    }

    runLayout(parent, newWidth, newHeight) {
        if (this.ignoreLayout) {
            return this;
        }

        super.runLayout(parent, newWidth, newHeight);

        this.childrenMap.hPalette.setMarkerPosition(this.value);
        this.childrenMap.svPalette.setMarkerPosition(this.value);

        return this;
    }

}

var HPalettePositionNamesMap = {
    bottom: 0,
    left: 1,
    top: 2,
    right: 3
}

export default ColorPicker;