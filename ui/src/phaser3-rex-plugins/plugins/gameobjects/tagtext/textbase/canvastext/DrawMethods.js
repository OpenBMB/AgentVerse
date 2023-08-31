import DrawRoundRectangleBackground from '../../../canvas/utils/DrawRoundRectangleBackground.js';

export default {
    draw(startX, startY, textWidth, textHeight) {
        var penManager = this.penManager;
        this.hitAreaManager.clear();

        var context = this.context;
        context.save();

        var defaultStyle = this.defaultStyle;

        this.clear();
        DrawRoundRectangleBackground(
            this,
            defaultStyle.backgroundColor,
            defaultStyle.backgroundStrokeColor,
            defaultStyle.backgroundStrokeLineWidth,
            defaultStyle.backgroundCornerRadius,
            defaultStyle.backgroundColor2,
            defaultStyle.backgroundHorizontalGradient,
            defaultStyle.backgroundCornerIteration
        );

        // draw lines
        startX += this.startXOffset;
        startY += this.startYOffset;
        var defaultHalign = defaultStyle.halign,
            valign = defaultStyle.valign;

        var lineWidth, lineHeight = defaultStyle.lineHeight;
        var lines = penManager.lines;
        var totalLinesNum = lines.length,
            maxLines = defaultStyle.maxLines;
        var drawLinesNum, drawLineStartIdx, drawLineEndIdx;
        if ((maxLines > 0) && (totalLinesNum > maxLines)) {
            drawLinesNum = maxLines;
            if (valign === 'center') { // center
                drawLineStartIdx = Math.floor((totalLinesNum - drawLinesNum) / 2);
            } else if (valign === 'bottom') { // bottom
                drawLineStartIdx = totalLinesNum - drawLinesNum;
            } else {
                drawLineStartIdx = 0;
            }
        } else {
            drawLinesNum = totalLinesNum;
            drawLineStartIdx = 0;
        }
        drawLineEndIdx = drawLineStartIdx + drawLinesNum;

        var offsetX, offsetY;
        var rtl = this.rtl,
            rtlOffset = (rtl) ? this.parent.width : undefined;
        if (valign === 'center') { // center
            offsetY = Math.max((textHeight - (drawLinesNum * lineHeight)) / 2, 0);
        } else if (valign === 'bottom') { // bottom
            offsetY = Math.max(textHeight - (drawLinesNum * lineHeight) - 2, 0);
        } else {
            offsetY = 0;
        }
        offsetY += startY;
        for (var lineIdx = drawLineStartIdx; lineIdx < drawLineEndIdx; lineIdx++) {
            lineWidth = penManager.getLineWidth(lineIdx);
            if (lineWidth === 0) {
                continue;
            }

            var pens = lines[lineIdx],
                penCount = pens.length;
            var halign = defaultHalign;
            // Seek if there has algin tag
            for (var penIdx = 0; penIdx < penCount; penIdx++) {
                var penAlign = pens[penIdx].prop.align
                if (penAlign !== undefined) {
                    halign = penAlign;
                    break;
                }
            }

            if (halign === 'center') { // center
                offsetX = (textWidth - lineWidth) / 2;
            } else if (halign === 'right') { // right
                offsetX = (!rtl) ? (textWidth - lineWidth) : 0;
            } else {
                offsetX = (!rtl) ? 0 : (textWidth - lineWidth);
            }
            offsetX += startX;

            for (var penIdx = 0; penIdx < penCount; penIdx++) {
                this.drawPen(pens[penIdx], offsetX, offsetY, rtlOffset);
            }
        }

        context.restore();
    },

    drawPen(pen, offsetX, offsetY, rtlOffset) {
        offsetX += pen.x;
        offsetY += pen.y + (pen.prop.y || 0);

        if (rtlOffset !== undefined) {
            offsetX = rtlOffset - offsetX;
        }

        var canvas = this.canvas;
        var context = this.context;
        context.save();

        var curStyle = this.parser.propToContextStyle(this.defaultStyle, pen.prop);
        curStyle.buildFont();
        curStyle.syncFont(canvas, context);
        curStyle.syncStyle(canvas, context);

        // Underline
        if ((curStyle.underlineThickness > 0) && (pen.width > 0)) {
            this.drawUnderline(offsetX, offsetY, pen.width, curStyle);
        }

        // Text
        if (pen.isTextPen) {
            this.drawText(offsetX, offsetY, pen.text, curStyle);
        }

        // Image
        if (pen.isImagePen) {
            this.drawImage(offsetX, offsetY, pen.prop.img, curStyle);
        }

        context.restore();

        if (pen.hasAreaMarker && (pen.width > 0)) {
            var data;
            var areaKey = pen.prop.area;
            if (areaKey) {
                data = {
                    key: areaKey
                };
            } else {
                var url = pen.prop.url;
                data = {
                    key: `url:${url}`,
                    url: url
                };
            }

            this.hitAreaManager.add(
                offsetX,                       // x
                (offsetY - this.startYOffset), // y
                pen.width,                     // width
                this.defaultStyle.lineHeight,  // height
                data
            );
        }
    },

    clear() {
        var canvas = this.canvas;
        this.context.clearRect(0, 0, canvas.width, canvas.height);
    },

    drawUnderline(x, y, width, style) {
        y += style.underlineOffset - (style.underlineThickness / 2);
        if (this.autoRound) {
            x = Math.round(x);
            y = Math.round(y);
        }

        var context = this.context;
        var savedLineCap = context.lineCap;
        context.lineCap = 'butt';
        context.strokeStyle = style.underlineColor;
        context.lineWidth = style.underlineThickness;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo((x + width), y);
        context.stroke();
        context.lineCap = savedLineCap;
    },

    drawText(x, y, text, style) {
        if (this.autoRound) {
            x = Math.round(x);
            y = Math.round(y);
        }

        var context = this.context;
        if (style.stroke && (style.stroke !== 'none') && (style.strokeThickness > 0)) {
            style.syncShadow(context, style.shadowStroke);
            context.strokeText(text, x, y);
        }

        if (style.color && (style.color !== 'none')) {
            style.syncShadow(context, style.shadowFill);
            context.fillText(text, x, y);
        }
    },

    drawImage(x, y, imgKey, style) {
        y -= this.startYOffset;
        this.parent.imageManager.draw(imgKey, this.context, x, y, this.autoRound);
    }

}