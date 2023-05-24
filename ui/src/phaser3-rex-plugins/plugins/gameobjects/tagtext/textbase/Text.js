import TextBase from '../../textbase/TextBase.js';
import TextStyle from '../../textbase/textstyle/TextStyle.js';
import CanvasText from './canvastext/CanvasText.js';
import Pool from '../../../pool.js';
import WrapTextLinesPoolClass from './wraptext/WrapTextLinesPool.js';
import CONST from '../../textbase/const.js';
import ImageManager from '../../../utils/texture/imagemanager/ImageManager.js';
import CopyCanvasToTexture from '../../../utils/texture/CopyCanvasToTexture.js';
import AppendText from '../../../utils/text/AppendText.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const AddToDOM = Phaser.DOM.AddToDOM;
const CanvasPool = Phaser.Display.Canvas.CanvasPool;
const GameObject = Phaser.GameObjects.GameObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const RemoveFromDOM = Phaser.DOM.RemoveFromDOM;
const SPLITREGEXP = CONST.SPLITREGEXP;

// Reuse objects can increase performance
var SharedPensPools = null;
var SharedLinesPool = null;
var SharedWrapTextLinesPool = null;

class Text extends TextBase {
    constructor(scene, x, y, text, style, type, parser) {
        if (IsPlainObject(x)) {
            var config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            text = GetValue(config, 'text', '');
            style = GetValue(config, 'style');
        }
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }

        super(scene, type);

        this.renderer = scene.sys.game.renderer;

        this.setPosition(x, y);
        this.setOrigin(0, 0);
        this.initPipeline();

        this.canvas = CanvasPool.create(this);

        this.context = this.canvas.getContext('2d', { willReadFrequently: true });

        this._imageManager = undefined;

        if (style) {
            // Override align
            if (style.hasOwnProperty('align')) {
                var halign = style.align;
                delete style.align;
                style.halign = halign;
            }
            // Has Stroke color but stroke thinkness, set stroke thinkness to 1
            if (style.hasOwnProperty('stroke') && !style.hasOwnProperty('strokeThickness')) {
                style.strokeThickness = 1;
            }
        }
        this.style = new TextStyle(this, style);

        var imageData = GetValue(style, 'images', undefined);
        if (imageData) {
            this.addImage(imageData);
        }

        this.autoRound = true;

        this._text = undefined;

        this.padding = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        };

        this.width = 1;

        this.height = 1;

        this.dirty = false;

        //  If resolution wasn't set, force it to 1
        if (this.style.resolution === 0) {
            this.style.resolution = 1;
        }

        this._crop = this.resetCropObject();

        //  Create a Texture for this Text object
        this.texture = scene.sys.textures.addCanvas(null, this.canvas, true);

        //  Get the frame
        this.frame = this.texture.get();

        //  Set the resolution
        this.frame.source.resolution = this.style.resolution;

        if (this.renderer && this.renderer.gl) {
            //  Clear the default 1x1 glTexture, as we override it later
            this.renderer.deleteTexture(this.frame.source.glTexture);
            this.frame.source.glTexture = null;
        }

        var sharedPoolMode = GetValue(style, 'sharedPool', true);

        var pensPool, linesPool, wrapTextLinesPool;
        if (sharedPoolMode) {
            // Use pools first time
            if (!SharedPensPools) {
                SharedPensPools = {};
                SharedLinesPool = new Pool();
                SharedWrapTextLinesPool = new WrapTextLinesPoolClass();

                // Remove cached data
                this.scene.game.events.once('destroy', function () {
                    SharedPensPools = null;
                    SharedLinesPool = null;
                    SharedWrapTextLinesPool = null;
                });
            }
            if (!SharedPensPools.hasOwnProperty(type)) {
                SharedPensPools[type] = new Pool();
            }

            pensPool = SharedPensPools[type];
            linesPool = SharedLinesPool;
            wrapTextLinesPool = SharedWrapTextLinesPool;
        } else {
            pensPool = new Pool();
            linesPool = new Pool();
            wrapTextLinesPool = new WrapTextLinesPoolClass();
        }

        this.canvasText = new CanvasText({
            parent: this,
            context: this.context,
            parser: parser,
            style: this.style,
            pensPool: pensPool,
            linesPool: linesPool,
            wrapTextLinesPool: wrapTextLinesPool,
        });
        this.parser = parser;

        this.initRTL();

        if (style && style.padding) {
            this.setPadding(style.padding);
        }

        this.setText(text);

        this.setUrlTagCursorStyle(GetValue(style, 'urlTagCursorStyle', 'pointer'));

        if (GetValue(style, 'interactive', false)) {
            this.setInteractive();
        }
    }

    preDestroy() {
        if (this.style.rtl) {
            RemoveFromDOM(this.canvas);
        }

        this.canvasText.destroy();
        this.canvasText = undefined;

        if (this._imageManager) {
            this._imageManager.destroy();
            this._imageManager = undefined;
        }

        CanvasPool.remove(this.canvas);

        this.texture.destroy();
    }

    set text(value) {
        this.setText(value);
    }
    get text() {
        return this._text;
    }

    initRTL() {
        if (!this.style.rtl) {
            return;
        }

        //  Here is where the crazy starts.
        //
        //  Due to browser implementation issues, you cannot fillText BiDi text to a canvas
        //  that is not part of the DOM. It just completely ignores the direction property.

        this.canvas.dir = 'rtl';

        //  Experimental atm, but one day ...
        this.context.direction = 'rtl';

        //  Add it to the DOM, but hidden within the parent canvas.
        this.canvas.style.display = 'none';

        AddToDOM(this.canvas, this.scene.sys.canvas);

        //  And finally we set the x origin
        this.originX = 1;
    }

    setText(value) {
        if (value == null) {
            value = '';
        } else if (Array.isArray(value)) {
            value = value.join('\n');
        } else {
            value = value.toString();
        }

        if (value === this._text) {
            return this;
        }

        this._text = value;
        this.updateText();

        return this;
    }

    setPadding(left, top, right, bottom) {
        if (typeof left === 'object') {
            var config = left;

            //  If they specify x and/or y this applies to all
            var x = GetValue(config, 'x', null);

            if (x !== null) {
                left = x;
                right = x;
            } else {
                left = GetValue(config, 'left', 0);
                right = GetValue(config, 'right', left);
            }

            var y = GetValue(config, 'y', null);

            if (y !== null) {
                top = y;
                bottom = y;
            } else {
                top = GetValue(config, 'top', 0);
                bottom = GetValue(config, 'bottom', top);
            }
        } else {
            if (left === undefined) {
                left = 0;
            }
            if (top === undefined) {
                top = left;
            }
            if (right === undefined) {
                right = left;
            }
            if (bottom === undefined) {
                bottom = top;
            }
        }

        this.padding.left = left;
        this.padding.top = top;
        this.padding.right = right;
        this.padding.bottom = bottom;

        return this.updateText(false);
    }

    updateText(runWrap) {
        if (runWrap === undefined) {
            runWrap = true;
        }
        var canvasText = this.canvasText;

        // wrap text to pens
        var style = this.style;
        if (runWrap) {
            canvasText.updatePenManager(
                this._text,
                style.wrapMode,
                style.wrapWidth,
                style.lineHeight
            );
        }

        // resize
        var padding = this.padding;
        var textWidth, textHeight;
        var linesWidth = Math.ceil(canvasText.linesWidth);
        if (style.fixedWidth === 0) {
            this.width = linesWidth + padding.left + padding.right;
            textWidth = linesWidth;
        }
        else {
            this.width = style.fixedWidth;
            textWidth = this.width - padding.left - padding.right;
            if (textWidth < linesWidth) {
                textWidth = linesWidth;
            }
        }
        if (style.fixedHeight === 0) {
            this.height = canvasText.linesHeight + padding.top + padding.bottom;
            textHeight = canvasText.linesHeight;
        }
        else {
            this.height = style.fixedHeight;
            textHeight = this.height - padding.top - padding.bottom;
            if (textHeight < canvasText.linesHeight) {
                textHeight = canvasText.linesHeight;
            }
        }

        var w = this.width;
        var h = this.height;

        this.updateDisplayOrigin();

        var resolution = style.resolution;
        w *= resolution;
        h *= resolution;

        w = Math.max(Math.ceil(w), 1);
        h = Math.max(Math.ceil(h), 1);

        var canvas = this.canvas;
        var context = this.context;
        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
            this.frame.setSize(w, h);
        } else {
            context.clearRect(0, 0, w, h);
        }

        context.save();
        context.scale(resolution, resolution);

        // draw
        var startX = (!this.style.rtl) ? padding.left : padding.right;
        var startY = padding.top;
        canvasText.draw(
            startX,
            startY,
            textWidth,
            textHeight,
        );

        context.restore();

        if (this.renderer && this.renderer.gl) {
            this.frame.source.glTexture = this.renderer.canvasToTexture(canvas, this.frame.source.glTexture, true);
            this.frame.glTexture = this.frame.source.glTexture;
        }

        this.dirty = true;

        var input = this.input;

        if (input && !input.customHitArea) {
            input.hitArea.width = this.width;
            input.hitArea.height = this.height;
        }

        return this;
    }

    toJSON() {
        var out = Components.ToJSON(this);

        //  Extra Text data is added here

        var data = {
            autoRound: this.autoRound,
            text: this._text,
            style: this.style.toJSON(),
            resolution: this.resolution,
            padding: {
                left: this.padding.left,
                right: this.padding.right,
                top: this.padding.top,
                bottom: this.padding.bottom
            }
        };

        out.data = data;

        return out;
    }

    setInteractive(hitArea, hitAreaCallback, dropZone) {
        var isInteractived = !!this.input;

        GameObject.prototype.setInteractive.call(this, hitArea, hitAreaCallback, dropZone);

        if (!isInteractived) {
            this.canvasText.setInteractive();
        }

        return this;
    }

    setUrlTagCursorStyle(cursor) {
        this.urlTagCursorStyle = cursor;
        return this;
    }

    get urlTagCursorStyle() {
        return this.canvasText.urlTagCursorStyle;
    }

    set urlTagCursorStyle(value) {
        this.canvasText.urlTagCursorStyle = value;
    }

    getWrappedText(text, start, end) {
        text = this.canvasText.getText(text, start, end, true);
        return text.split(SPLITREGEXP);
    }

    getPlainText(text, start, end) {
        return this.canvasText.getPlainText(text, start, end);
    }

    getText(text, start, end, wrap) {
        if (wrap === undefined) {
            wrap = false;
        }
        return this.canvasText.getText(text, start, end, wrap);
    }

    getSubString(text, start, end) {
        return this.getText(text, start, end);
    }

    copyPenManager(penManager) {
        return this.canvasText.copyPenManager(penManager);
    }

    getPenManager(text, penManager) {
        return this.canvasText.getPenManager(text, penManager);
    }

    setSize(width, height) {
        return this.setFixedSize(width, height);
    }

    resize(width, height) {
        return this.setFixedSize(width, height);
    }

    get imageManager() {
        if (!this._imageManager) {
            this._imageManager = new ImageManager(this.scene);
        }
        return this._imageManager;
    }

    addImage(key, config) {
        this.imageManager.add(key, config);
        return this;
    }

    drawAreaBounds(graphics, color) {
        this.canvasText.hitAreaManager.drawBounds(graphics, color, this);
        return this;
    }

    generateTexture(key, x, y, width, height) {
        var srcCanvas = this.canvas;
        if (width === undefined) {
            width = srcCanvas.width;
        } else {
            width *= this.resolution;
        }
        if (height === undefined) {
            height = srcCanvas.height;
        } else {
            height *= this.resolution;
        }

        CopyCanvasToTexture(this.scene, srcCanvas, key, x, y, width, height);
        return this;
    }
}

var methods = {
    appendText: AppendText,
}

Object.assign(
    Text.prototype,
    methods
)
export default Text;