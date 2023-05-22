import DrawCicle from '../../../utils/canvas/DrawCircle.js';
import DrawText from '../../../utils/canvas/DrawText.js';


var DrawContent = function () {
    var x = this.radius;
    var lineWidth = this.thickness * this.radius;
    var barRadius = this.radius - (lineWidth / 2);
    var centerRadius = this.radius - lineWidth;
    var canvas = this.canvas,
        context = this.context;

    // Draw track
    if (this.trackColor && (lineWidth > 0)) {
        context.save();

        DrawCicle(
            canvas, context,
            x, x,
            barRadius, barRadius,
            undefined,
            this.trackColor,
            lineWidth
        );

        context.restore();
    }

    // Draw bar
    if ((this.barColor) && (barRadius > 0)) {
        var anticlockwise, startAngle, endAngle;
        if (this.value === 1) {
            anticlockwise = false;
            startAngle = 0;
            endAngle = 2 * Math.PI;
        } else {
            anticlockwise = this.anticlockwise;
            startAngle = this.startAngle;
            var deltaAngle = 2 * Math.PI * ((anticlockwise) ? (1 - this.value) : this.value);
            endAngle = deltaAngle + startAngle;
        }

        context.save();

        DrawCicle(
            canvas, context,
            x, x,
            barRadius, barRadius,
            undefined,
            this.barColor,
            lineWidth,
            startAngle, endAngle, anticlockwise
        );

        context.restore();
    }

    // Draw center
    if (this.centerColor && (centerRadius > 0)) {
        var fillStyle;
        if (this.centerColor2) {
            fillStyle = this.context.createRadialGradient(x, x, 0, x, x, centerRadius);
            fillStyle.addColorStop(0, this.centerColor);
            fillStyle.addColorStop(1, this.centerColor2);
        } else {
            fillStyle = this.centerColor;
        }

        context.save();

        DrawCicle(
            canvas, context,
            x, x,
            centerRadius, centerRadius,
            fillStyle
        );

        context.restore();
    }

    // Draw text
    if (this.textFormatCallback && (this.textColor || this.textStrokeColor)) {

        context.save();

        DrawText(
            canvas, context,
            x, x,
            this.getFormatText(), this.textFont,
            this.textColor, this.textStrokeColor, this.textStrokeThickness,
            'center',  // textAlign
            'middle'   // textBaseline
        )

        context.restore();
    }
}

export default DrawContent;