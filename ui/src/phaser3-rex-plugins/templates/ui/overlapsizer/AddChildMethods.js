import AddChild from '../basesizer/utils/AddChild.js';
import ALIGNMODE from '../utils/AlignConst.js';
import GetBoundsConfig from '../utils/GetBoundsConfig.js';
import { GetDisplayWidth, GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const ALIGN_CENTER = Phaser.Display.Align.CENTER;
const UUID = Phaser.Utils.String.UUID;

var Add = function (gameObject, childKey, align, padding, expand, minWidth, minHeight, offsetX, offsetY) {
    AddChild.call(this, gameObject);

    if (IsPlainObject(childKey)) {
        var config = childKey;
        childKey = GetValue(config, 'key', undefined);
        align = GetValue(config, 'align', ALIGN_CENTER);
        offsetX = GetValue(config, 'offsetX', 0);
        offsetY = GetValue(config, 'offsetY', 0);
        padding = GetValue(config, 'padding', 0);
        expand = GetValue(config, 'expand', true);

        if (!gameObject.isRexSizer) {
            // Get minWidth,minHeight from config
            minWidth = GetValue(config, 'minWidth', gameObject._minWidth);
            minHeight = GetValue(config, 'minHeight', gameObject._minHeighted);
        }
    }

    var hasValidKey = (childKey !== undefined);
    if (!hasValidKey) {
        childKey = UUID();
    }

    if (typeof (align) === 'string') {
        align = ALIGNMODE[align];
    }

    if (align === undefined) {
        align = ALIGN_CENTER;
    }
    if (offsetX === undefined) {
        offsetX = 0;
    }
    if (offsetY === undefined) {
        offsetY = 0;
    }
    if (padding === undefined) {
        padding = 0;
    }
    if (expand === undefined) {
        expand = true;
    }
    if (!gameObject.isRexSizer) {
        // Get minWidth,minHeight from game object
        if (minWidth === undefined) {
            minWidth = gameObject._minWidth;
        }
        if (minHeight === undefined) {
            minHeight = gameObject._minHeight;
        }
    }

    var config = this.getSizerConfig(gameObject);
    config.align = align;
    config.alignOffsetX = offsetX;
    config.alignOffsetY = offsetY;
    config.padding = GetBoundsConfig(padding);

    if (IsPlainObject(expand)) {
        config.expandWidth = GetValue(expand, 'width', false);
        config.expandHeight = GetValue(expand, 'height', false);
    } else {
        config.expandWidth = expand;
        config.expandHeight = expand;
    }

    if (!gameObject.isRexSizer) {  // Expand normal game object
        if (config.expandWidth) {
            // minWidth is still undefined, uses current display width
            gameObject.minWidth = (minWidth === undefined) ? GetDisplayWidth(gameObject) : minWidth;
        }
        if (config.expandHeight) {
            // minHeight is still undefined, uses current display height
            gameObject.minHeight = (minHeight === undefined) ? GetDisplayHeight(gameObject) : minHeight;
        }
    }

    if (this.sizerChildren.hasOwnProperty(childKey)) {
        this.sizerChildren[childKey].destroy();
    }
    this.sizerChildren[childKey] = gameObject;

    if (hasValidKey) {
        this.addChildrenMap(childKey, gameObject)
    }
    return this;
}

export default {
    add: Add
}