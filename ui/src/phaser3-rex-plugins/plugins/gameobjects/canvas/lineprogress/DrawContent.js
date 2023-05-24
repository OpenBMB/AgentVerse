import DrawPolygon from '../../../utils/canvas/DrawPolygon.js';

var DrawContent = function () {
    var skewX = this.skewX;
    var width = this.width - Math.abs(skewX);
    var height = this.height;
    var canvas = this.canvas,
        context = this.context;

    // Has track
    if (this.trackColor || this.trackStrokeColor) {
        BuildPolygon(
            0, 0,           // x0, y0
            width, height,  // x1, y1
            skewX,          // skewX
            this.trackPoints
        )
    }

    // Has bar
    var barX0, barX1;
    if (this.barColor) {
        if (!this.rtl) {
            barX0 = 0;
            barX1 = width * this.value;
        } else {
            barX0 = width * (1 - this.value);
            barX1 = width;
        }

        BuildPolygon(
            barX0, 0,       // x0, y0
            barX1, height,  // x1, y1
            skewX,          // skewX
            this.barPoints
        )
    }

    if (this.trackColor) {
        context.save();

        DrawPolygon(
            canvas, context,
            this.trackPoints,
            this.trackColor,
        )

        context.restore();
    }

    if (this.barColor) {
        context.save();

        var style;
        if (this.barColor2) {
            var grd;
            if (this.isHorizontalGradient) {
                var helfHeight = height / 2;
                grd = context.createLinearGradient(barX0, helfHeight, barX1, helfHeight);
            } else {
                var helfWidth = width / 2;
                grd = context.createLinearGradient(helfWidth, 0, helfWidth, height);
            }
            grd.addColorStop(0, (this.rtl) ? this.barColor : this.barColor2);
            grd.addColorStop(1, (this.rtl) ? this.barColor2 : this.barColor);
            style = grd;
        } else {
            style = this.barColor;
        }

        DrawPolygon(
            canvas, context,
            this.barPoints,
            style,
        )

        context.restore();
    }

    if (this.trackStrokeColor && this.trackStrokeThickness > 0) {
        context.save();

        DrawPolygon(
            canvas, context,
            this.trackPoints,
            undefined,
            this.trackStrokeColor, this.trackStrokeThickness,
        )

        context.restore();
    }
}

var BuildPolygon = function (x0, y0, x1, y1, skewX, out) {
    if (out === undefined) {
        out = [];
    }
    out.length = 4;

    for (var i = 0; i < 4; i++) {
        if (!out[i]) {
            out[i] = {};
        }
    }

    var p;
    if (skewX >= 0) {
        p = out[0];
        p.x = x0 + skewX;
        p.y = y0;

        p = out[1];
        p.x = x1 + skewX;
        p.y = y0;

        p = out[2];
        p.x = x1;
        p.y = y1;

        p = out[3];
        p.x = x0;
        p.y = y1;
    } else {
        p = out[0];
        p.x = x0;
        p.y = y0;

        p = out[1];
        p.x = x1;
        p.y = y0;

        p = out[2];
        p.x = x1 - skewX;
        p.y = y1;

        p = out[3];
        p.x = x0 - skewX;
        p.y = y1;
    }

    return out;
}

export default DrawContent;