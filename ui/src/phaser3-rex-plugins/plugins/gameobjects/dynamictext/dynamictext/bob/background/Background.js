import RenderBase from '../renderbase/RenderBase.js';
import GetStyle from '../../../../../utils/canvas/GetStyle.js';
import GetProperty from '../utils/GetProperty.js';
import DrawRoundRectangleBackground from '../../../../canvas/utils/DrawRoundRectangleBackground.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Background extends RenderBase {
    constructor(parent, config) {
        super(parent, 'background');

        this.setColor(
            GetValue(config, 'color', null),
            GetValue(config, 'color2', null),
            GetValue(config, 'horizontalGradient', true)
        );

        this.setStroke(
            GetValue(config, 'stroke', null),
            GetValue(config, 'strokeThickness', 2)
        );

        this.setCornerRadius(
            GetValue(config, 'cornerRadius', 0),
            GetValue(config, 'cornerIteration', null)
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

    set cornerRadius(value) {
        this.setDirty(this._cornerRadius != value);
        this._cornerRadius = value;
    }

    get cornerRadius() {
        return this._cornerRadius;
    }

    set cornerIteration(value) {
        this.setDirty(this._cornerIteration != value);
        this._cornerIteration = value;
    }

    get cornerIteration() {
        return this._cornerIteration;
    }

    modifyStyle(o) {
        if (o.hasOwnProperty('color')) {
            this.setColor(
                o.color,
                GetProperty('color2', o, this),
                GetProperty('horizontalGradient', o, this),
            );
        }
        if (o.hasOwnProperty('stroke')) {
            this.setStroke(
                o.stroke,
                GetProperty('strokeThickness', o, this),
            );
        }
        if (o.hasOwnProperty('cornerRadius')) {
            this.setCornerRadius(
                o.cornerRadius,
                GetProperty('cornerIteration', o, this),
            );
        }

        return this;
    }

    modifyPorperties(o) {
        super.modifyPorperties(o);

        this.modifyStyle(o);

        return this;
    }

    setCornerRadius(radius, iteration) {
        this.cornerRadius = radius;
        this.cornerIteration = iteration;
        return this;
    }

    renderContent() {
        DrawRoundRectangleBackground(
            this.parent,
            this.color,
            this.stroke,
            this.strokeThickness,
            this.cornerRadius,
            this.color2,
            this.horizontalGradient,
            this.cornerIteration
        );
    }
}

export default Background;