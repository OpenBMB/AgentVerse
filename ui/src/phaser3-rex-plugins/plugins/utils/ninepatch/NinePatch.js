import Methods from './Methods.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

var NinePatchBase = function (GOClass, type) {
    class NinePatch extends GOClass {
        constructor(scene, x, y, width, height, key, baseFrame, columns, rows, config) {
            if (IsPlainObject(x)) {
                config = x;
                x = GetValue(config, 'x', 0);
                y = GetValue(config, 'y', 0);
                width = GetValue(config, 'width', 1);
                height = GetValue(config, 'height', 1);
                key = GetValue(config, 'key', undefined);
                baseFrame = GetValue(config, 'baseFrame', undefined);
                columns = GetValue(config, 'columns', undefined);
                rows = GetValue(config, 'rows', undefined);
            } else if (IsPlainObject(width)) {
                config = width;
                width = GetValue(config, 'width', 1);
                height = GetValue(config, 'height', 1);
                key = GetValue(config, 'key', undefined);
                baseFrame = GetValue(config, 'baseFrame', undefined);
                columns = GetValue(config, 'columns', undefined);
                rows = GetValue(config, 'rows', undefined);
            } else if (IsPlainObject(key)) {
                config = key;
                key = GetValue(config, 'key', undefined);
                baseFrame = GetValue(config, 'baseFrame', undefined);
                columns = GetValue(config, 'columns', undefined);
                rows = GetValue(config, 'rows', undefined);
            } else if (IsPlainObject(baseFrame)) {
                config = baseFrame;
                baseFrame = GetValue(config, 'baseFrame', undefined);
                columns = GetValue(config, 'columns', undefined);
                rows = GetValue(config, 'rows', undefined);
            } else if (Array.isArray(baseFrame)) {
                config = rows;
                rows = columns;
                columns = baseFrame;
                baseFrame = GetValue(config, 'baseFrame', undefined);
            } else if (IsPlainObject(columns)) {
                config = columns;
                columns = GetValue(config, 'columns', undefined);
                rows = GetValue(config, 'rows', undefined);
            }

            if (columns === undefined) {
                var leftWidth = GetValue(config, 'leftWidth', undefined);
                var rightWidth = GetValue(config, 'rightWidth', undefined);
                if ((leftWidth !== undefined) && (rightWidth !== undefined)) {
                    columns = [leftWidth, undefined, rightWidth];
                }
            }

            if (rows === undefined) {
                var topHeight = GetValue(config, 'topHeight', undefined);
                var bottomHeight = GetValue(config, 'bottomHeight', undefined);
                if ((topHeight !== undefined) && (bottomHeight !== undefined)) {
                    rows = [topHeight, undefined, bottomHeight];
                }
            }

            super(scene);
            this.type = type;
            this
                .setPosition(x, y)
                .setSize(width, height)
                .setOrigin(0.5, 0.5);

            this.columns = {};
            this.rows = {};
            this.stretchMode = {};
            this._tileSprite = undefined; // Reserved for drawing image
            this._image = undefined; // Reserved for drawing image

            this.setGetFrameNameCallback(GetValue(config, 'getFrameNameCallback', undefined));
            this.setStretchMode(GetValue(config, 'stretchMode', 0));
            this.setPreserveRatio(GetValue(config, 'preserveRatio', true));

            var maxFixedPartScale = GetValue(config, 'maxFixedPartScale', 1);
            var maxFixedPartScaleX = GetValue(config, 'maxFixedPartScaleX', maxFixedPartScale);
            var maxFixedPartScaleY = GetValue(config, 'maxFixedPartScaleY', undefined);
            this.setMaxFixedPartScale(maxFixedPartScaleX, maxFixedPartScaleY);

            this.setBaseTexture(key, baseFrame, columns, rows);
        }

        get minWidth() {
            return this.columns.minWidth;
        }

        get minHeight() {
            return this.rows.minHeight;
        }

        get fixedPartScaleX() {
            return this.columns.scale;
        }

        get fixedPartScaleY() {
            return this.rows.scale;
        }

        resize(width, height) {
            if ((this.width === width) && (this.height === height)) {
                return this;
            }

            if (super.resize) {
                super.resize(width, height);
            } else {
                // Use setSize method for alternative 
                super.setSize(width, height);
            }
            this.updateTexture();

            return this;
        }
    }

    Object.assign(
        NinePatch.prototype,
        Methods
    );

    return NinePatch;
}

export default NinePatchBase;