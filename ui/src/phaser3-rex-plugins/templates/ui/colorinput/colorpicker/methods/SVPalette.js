import OverlapSizer from '../../../overlapsizer/OverlapSizer.js';
import SVPaletteCanvas from './SVPaletteCanvas.js';
import RoundRectangle from '../../../roundrectangle/RoundRectangle.js';
import { LocalToWorld } from './Transform.js';

class SVPalette extends OverlapSizer {
    constructor(scene, config) {
        super(scene, config);

        var paletteCanvas = new SVPaletteCanvas(scene);
        scene.add.existing(paletteCanvas);
        this.type = 'rexColorPicker.SVPalette';

        paletteCanvas
            .setInteractive()
            .on('pointerdown', this.onPaletteCanvasPointerDown, this)
            .on('pointermove', this.onPaletteCanvasPointerDown, this)

        var marker = new RoundRectangle(scene, { radius: 5, strokeColor: 0xffffff, strokeWidth: 2 });
        scene.add.existing(marker);

        this
            .add(
                paletteCanvas,
                { key: 'paletteCanvas', expand: true }
            )
            .add(
                marker,
                { key: 'marker', expand: false }
            )
    }

    onPaletteCanvasPointerDown(pointer, localX, localY, event) {
        if (!pointer.isDown) {
            return;
        }

        var paletteCanvas = this.childrenMap.paletteCanvas;
        var color = paletteCanvas.getColor(localX, localY);
        this.setMarkerPosition(color);

        this.emit('input', color);
    }

    get color() {
        return this.childrenMap.paletteCanvas.color;
    }

    setHue(hue) {
        var paletteCanvas = this.childrenMap.paletteCanvas;
        paletteCanvas.setHue(hue);  // Redraw paletteCanvas
        // Position of marker does not change
        return this;
    }

    setColor(color) {
        if (this.color === color) {
            return this;
        }

        var paletteCanvas = this.childrenMap.paletteCanvas;
        paletteCanvas.setColor(color);  // Redraw paletteCanvas
        this.setMarkerPosition(color);
        return this;
    }

    setMarkerPosition(color) {
        var paletteCanvas = this.childrenMap.paletteCanvas;
        var marker = this.childrenMap.marker;

        var localXY = paletteCanvas.colorToLocalPosition(color, true);
        LocalToWorld(paletteCanvas, localXY.x, localXY.y, marker);
        this.resetChildPositionState(marker);

        return this;
    }
}

export default SVPalette;