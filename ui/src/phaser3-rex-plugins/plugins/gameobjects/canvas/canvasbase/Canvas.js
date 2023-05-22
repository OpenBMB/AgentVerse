import Render from './render/Render.js';
import CanvasMethods from './CanvasMethods.js';
import TextureMethods from './TextureMethods.js';

const CanvasPool = Phaser.Display.Canvas.CanvasPool;
const GameObject = Phaser.GameObjects.GameObject;

class Canvas extends GameObject {
    constructor(scene, x, y, width, height) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }
        if (width === undefined) {
            width = 1;
        }
        if (height === undefined) {
            height = 1;
        }

        super(scene, 'rexCanvas');

        this.renderer = scene.sys.game.renderer;

        this.resolution = 1;
        this._width = width;
        this._height = height;
        width = Math.max(Math.ceil(width * this.resolution), 1);
        height = Math.max(Math.ceil(height * this.resolution), 1);
        this.canvas = CanvasPool.create(this, width, height);
        this.context = this.canvas.getContext('2d', { willReadFrequently: true });
        this.dirty = false;

        this.setPosition(x, y);
        this.setOrigin(0.5, 0.5);
        this.initPipeline();

        this._crop = this.resetCropObject();

        //  Create a Texture for this Text object
        this.texture = scene.sys.textures.addCanvas(null, this.canvas, true);

        //  Get the frame
        this.frame = this.texture.get();

        //  Set the resolution
        this.frame.source.resolution = this.resolution;

        if (this.renderer && this.renderer.gl) {
            //  Clear the default 1x1 glTexture, as we override it later
            this.renderer.deleteTexture(this.frame.source.glTexture);
            this.frame.source.glTexture = null;
        }

        this.dirty = true;
    }

    preDestroy() {
        CanvasPool.remove(this.canvas);
        this.texture.destroy();

        this.canvas = null;
        this.context = null;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this.setSize(value, this._height);
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this.setSize(this._width, value);
    }

    setCanvasSize(width, height) {
        if ((this._width === width) && (this._height === height)) {
            return this;
        }

        this._width = width;
        this._height = height;

        this.updateDisplayOrigin();

        width = Math.max(Math.ceil(width * this.resolution), 1);
        height = Math.max(Math.ceil(height * this.resolution), 1);
        this.canvas.width = width;
        this.canvas.height = height;

        this.frame.setSize(width, height);

        this.dirty = true;
        return this;
    }

    // setSize might be override
    setSize(width, height) {
        this.setCanvasSize(width, height);
        return this;
    }

    get displayWidth() {
        return this.scaleX * this._width;
    }

    set displayWidth(value) {
        this.scaleX = value / this._width;
    }

    get displayHeight() {
        return this.scaleY * this._height;
    }

    set displayHeight(value) {
        this.scaleY = value / this._height;
    }

    setDisplaySize(width, height) {
        this.displayWidth = width;
        this.displayHeight = height;
        return this;
    }

    getCanvas(readOnly) {
        if (!readOnly) {
            this.dirty = true;
        }
        return this.canvas;
    }

    getContext(readOnly) {
        if (!readOnly) {
            this.dirty = true;
        }
        return this.context;
    }

    needRedraw() {
        this.dirty = true;
        return this;
    }

    resize(width, height) {
        this.setSize(width, height);
        return this;
    }
}

const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(Canvas,
    [
        Components.Alpha,
        Components.BlendMode,
        Components.Crop,
        Components.Depth,
        Components.Flip,
        Components.GetBounds,
        Components.Mask,
        Components.Origin,
        Components.Pipeline,
        Components.PostPipeline,
        Components.ScrollFactor,
        Components.Tint,
        Components.Transform,
        Components.Visible,
        Render,
        CanvasMethods,
        TextureMethods,
    ]
);

export default Canvas;