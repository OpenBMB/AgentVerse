var UpdateShapes = function () {
    var skewX = this.skewX;
    var width = this.width - Math.abs(skewX);
    var height = this.height;
    var trackFill = this.getShape('trackFill');
    trackFill.fillStyle(this.trackColor);
    if (trackFill.isFilled) {
        BuildRectangle(
            trackFill,      // lines
            0, 0,           // x0, y0
            width, height,  // x1, y1
            skewX           // skewX
        )
            .close()
    }

    var bar = this.getShape('bar');
    bar.fillStyle(this.barColor);
    if (bar.isFilled) {
        var barX0, barX1;
        if (!this.rtl) {
            barX0 = 0;
            barX1 = width * this.value;
        } else {
            barX0 = width * (1 - this.value);
            barX1 = width;
        }

        BuildRectangle(
            bar,            // lines
            barX0, 0,       // x0, y0
            barX1, height,  // x1, y1
            skewX           // skew
        )
            .close()
    }

    var trackStroke = this.getShape('trackStroke');
    trackStroke.lineStyle(this.trackStrokeThickness, this.trackStrokeColor);
    if (trackStroke.isStroked) {
        BuildRectangle(
            trackStroke,     // lines            
            0, 0,           // x0, y0
            width, height,  // x1, y1
            skewX           // skewX
        )
            .end()
    }
}

var BuildRectangle = function (lines, x0, y0, x1, y1, skewX) {
    if (skewX >= 0) {
        lines
            .startAt(x0 + skewX, y0).lineTo(x1 + skewX, y0)
            .lineTo(x1, y1)
            .lineTo(x0, y1)
            .lineTo(x0 + skewX, y0)
    } else {
        lines
            .startAt(x0, y0).lineTo(x1, y0)
            .lineTo(x1 - skewX, y1)
            .lineTo(x0 - skewX, y1)
            .lineTo(x0, y0)
    }

    return lines;
}

export default UpdateShapes;