import { TextType, TagTextType, BitmapTextType } from '../../../../plugins/utils/text/GetTextObjectType.js'
import GetTextObjectType from '../../../../plugins/utils/text/GetTextObjectType.js';
import AddChildMask from '../../../../plugins/gameobjects/container/containerlite/mask/AddChildMask.js';
import BaseSizer from '../../basesizer/BaseSizer.js';
import Methods from './Methods.js';
import GetBoundsConfig from '../../utils/GetBoundsConfig.js';
import LinesCountToTextHeight from './LinesCountToTextHeight.js';
import TextHeightToLinesCount from './TextHeightToLinesCount.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const ALIGN_LEFTTOP = Phaser.Display.Align.TOP_LEFT;

class TextBlock extends BaseSizer {
    constructor(scene, x, y, minWidth, minHeight, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
        } else if (IsPlainObject(minWidth)) {
            config = minWidth;
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
        }

        super(scene, x, y, minWidth, minHeight, config);

        this.type = 'rexTextBlock';
        this.textObject = undefined;
        this.linesCount = 0;
        this.textMask = undefined;
        this.textObjectType = undefined;
        this._textLineHeight = undefined;
        this._textLineSpacing = undefined;
        this._visibleLinesCount = undefined;
        this._textHeight = undefined;
        this._textVisibleHeight = undefined;
        this._textObjectRealHeight = 0;

        this.lines = undefined;
        // Text object : array of string
        // Tag text object : pens-manager
        // Bitmap text object : array of string

        this.text = GetValue(config, 'content', '');
        this._textOY = 0;
        this.execeedTopState = false;
        this.execeedBottomState = false;

        this.setClampMode(GetValue(config, 'clamplTextOY', true));

        this.alwaysScrollable = GetValue(config, 'alwaysScrollable', false);

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var textObject = GetValue(config, 'text', undefined);
        if (textObject === undefined) {
            textObject = CreateDefaultTextObject(scene);
        }
        this.textCropEnable = GetValue(config, 'textCrop', !!textObject.setCrop)
        var textMaskEnable = GetValue(config, 'textMask', !this.textCropEnable);

        if (background) {
            this.addBackground(background);
        }

        this.add(textObject);
        this.sizerChildren = [textObject];

        var sizerConfig = this.getSizerConfig(textObject);
        sizerConfig.align = ALIGN_LEFTTOP;
        sizerConfig.padding = GetBoundsConfig(0);
        sizerConfig.expand = true;
        this.textObject = textObject;

        this.textObjectType = GetTextObjectType(textObject);

        // Add more variables
        sizerConfig.preOffsetY = 0;
        sizerConfig.offsetY = 0;

        // Create mask of text object
        if (textMaskEnable) {
            this.textMask = AddChildMask.call(this, this.textObject, this);
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('text', textObject);
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        this.textObject = undefined;
        this.textMask = undefined;
        if (this.lines) {
            switch (this.textObjectType) {
                case TextType:
                    this.lines.length = 0;
                    break;
                case TagTextType:
                    this.lines.destroy();
                    break;
                case BitmapTextType:
                    this.lines.length = 0;
                    break;
            }
            this.lines = undefined;
        }

        super.destroy(fromScene);
    }

    setClampMode(mode) {
        if (mode === undefined) {
            mode = true;
        }
        this.clampTextOY = mode;
        return this;
    }

    get textLineHeight() {
        if (this._textLineHeight === undefined) {
            var lineHeight;
            switch (this.textObjectType) {
                case TextType:
                case TagTextType:
                    var style = this.textObject.style;
                    lineHeight = style.metrics.fontSize + style.strokeThickness;
                    break;
                case BitmapTextType:
                    var scale = (this.textObject.fontSize / this.textObject.fontData.size);
                    lineHeight = this.textObject.fontData.lineHeight * scale;
                    break;

            }
            this._textLineHeight = lineHeight;
        }
        return this._textLineHeight;
    }

    get textLineSpacing() {
        if (this._textLineSpacing === undefined) {
            var lineSpacing;
            switch (this.textObjectType) {
                case TextType:
                case TagTextType:
                    lineSpacing = this.textObject.lineSpacing;
                    break;
                case BitmapTextType:
                    lineSpacing = 0;
                    break;
            }
            this._textLineSpacing = lineSpacing;
        }
        return this._textLineSpacing;
    }

    get visibleLinesCount() {
        if (this._visibleLinesCount === undefined) {
            this._visibleLinesCount = Math.floor(TextHeightToLinesCount.call(this, this._textObjectRealHeight));
        }
        return this._visibleLinesCount;
    }

    get topTextOY() {
        return 0;
    }

    get bottomTextOY() {
        return -this.textVisibleHeight;
    }

    get textHeight() {
        if (this._textHeight === undefined) {
            this._textHeight = LinesCountToTextHeight.call(this, this.linesCount);
        }
        return this._textHeight;
    }

    get textObjectHeight() {
        return this._textObjectRealHeight - (this.textLineHeight + this.textLineSpacing);  // Remove 1 text line
    }

    get textVisibleHeight() {
        if (this._textVisibleHeight === undefined) {
            var h = this.textHeight - this.textObjectHeight;
            if (!this.alwaysScrollable && (h < 0)) {
                h = 0;
            }
            this._textVisibleHeight = h;
        }
        return this._textVisibleHeight;
    }

    textOYExceedTop(oy) {
        if (oy === undefined) {
            oy = this.textOY;
        }
        return (oy > this.topTextOY);
    }

    textOYExeceedBottom(oy) {
        if (oy === undefined) {
            oy = this.textOY;
        }
        return (oy < this.bottomTextOY);
    }

    get textOY() {
        return this._textOY;
    }

    set textOY(oy) {
        var topTextOY = this.topTextOY;
        var bottomTextOY = this.bottomTextOY;
        var textOYExceedTop = this.textOYExceedTop(oy);
        var textOYExeceedBottom = this.textOYExeceedBottom(oy);

        if (this.clampTextOY) {
            if (this.visibleLinesCount > this.linesCount) {
                oy = 0;
            } else if (textOYExceedTop) {
                oy = topTextOY
            } else if (textOYExeceedBottom) {
                oy = bottomTextOY;
            }
        }

        if (this._textOY !== oy) {
            this._textOY = oy;
            this.updateTextObject();
        }

        if (textOYExceedTop) {
            if (!this.execeedTopState) {
                this.emit('execeedtop', this, oy, topTextOY);
            }
        }
        this.execeedTopState = textOYExceedTop;

        if (textOYExeceedBottom) {
            if (!this.execeedBottomState) {
                this.emit('execeedbottom', this, oy, bottomTextOY);
            }
        }
        this.execeedBottomState = textOYExeceedBottom;
    }

    setTextOY(oy) {
        this.textOY = oy;
        return this;
    }

    set t(value) {
        this.textOY = -this.textVisibleHeight * value;
    }

    get t() {
        var textVisibleHeight = this.textVisibleHeight;
        if (textVisibleHeight === 0) {
            return 0;
        }
        return (this.textOY / -textVisibleHeight);
    }

    setTextOYByPercentage(percentage) {
        this.t = percentage;
        return this;
    }
}

var CreateDefaultTextObject = function (scene) {
    return scene.add.text(0, 0, '');
};

Object.assign(
    TextBlock.prototype,
    Methods
);

export default TextBlock;