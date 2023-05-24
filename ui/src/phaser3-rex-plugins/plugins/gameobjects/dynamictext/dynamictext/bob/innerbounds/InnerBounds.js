import RenderBase from '../renderbase/RenderBase.js';
import GetStyle from '../../../../../utils/canvas/GetStyle.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class InnerBounds extends RenderBase {
    constructor(parent, config) {
        super(parent, 'innerbounds');

        this.setColor(
            GetValue(config, 'color', null),
            GetValue(config, 'color2', null),
            GetValue(config, 'horizontalGradient', true)
        );

        this.setStroke(
            GetValue(config, 'stroke', null),
            GetValue(config, 'strokeThickness', 2)
        );
    }

    set color(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._color != value);
        this._color = value;
    }

    get color() {
        return this._color;
    }

    set color2(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._color2 != value);
        this._color2 = value;
    }

    get color2() {
        return this._color2;
    }

    set horizontalGradient(value) {
        this.setDirty(this._horizontalGradient != value);
        this._horizontalGradient = value;
    }

    get horizontalGradient() {
        return this._horizontalGradient;
    }

    setColor(color, color2, isHorizontalGradient) {
        if (isHorizontalGradient === undefined) {
            isHorizontalGradient = true;
        }

        this.color = color;
        this.color2 = color2;
        this.horizontalGradient = isHorizontalGradient;
        return this;
    }

    set stroke(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._stroke != value);
        this._stroke = value;
    }

    get stroke() {
        return this._stroke;
    }

    set strokeThickness(value) {
        this.setDirty(this._strokeThickness != value);
        this._strokeThickness = value;
    }

    get strokeThickness() {
        return this._strokeThickness;
    }

    setStroke(color, lineWidth) {
        if (color != null) {
            if (lineWidth === undefined) {
                lineWidth = 2;
            }
        }
        this.stroke = color;
        this.strokeThickness = lineWidth;
        return this;
    }

    modifyPorperties(o) {
        super.modifyPorperties(o);

        if (o.hasOwnProperty('color')) {
            this.setColor(
                o.color,
                GetValue(o, 'color2', null),
                GetValue(o, 'horizontalGradient', true)
            );
        }
        if (o.hasOwnProperty('stroke')) {
            this.setStroke(
                o.stroke,
                GetValue(o, 'strokeThickness', 2)
            );
        }
    }

    renderContent() {
        var padding = this.parent.padding;
        var x = padding.left,
            y = padding.top,
            width = this.parent.width - padding.left - padding.right,
            height = this.parent.height - padding.top - padding.bottom;
        var context = this.context;
        if (this.color != null) {
            var fillStyle;
            if (this.color2 != null) {
                var grd;
                if (this.horizontalGradient) {
                    grd = context.createLinearGradient(0, 0, width, 0);
                } else {
                    grd = context.createLinearGradient(0, 0, 0, height);
                }
                grd.addColorStop(0, this.color);
                grd.addColorStop(1, this.color2);
                fillStyle = grd;
            } else {
                fillStyle = this.color;
            }

            context.fillStyle = fillStyle;
            context.fillRect(x, y, width, height);
        }

        if ((this.stroke != null) && (this.strokeThickness > 0)) {
            context.strokeStyle = this.stroke;
            context.lineWidth = this.strokeThickness;
            context.strokeRect(x, y, width, height);
        }
    }
}

export default InnerBounds;