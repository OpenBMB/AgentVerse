var GetDefaultTextHeight = function () {
    var metrics = this.defaultTextStyle.getTextMetrics(this.context, this.testString);
    var ascent, descent;
    if ('actualBoundingBoxAscent' in metrics) {
        ascent = metrics.actualBoundingBoxAscent;
        descent = metrics.actualBoundingBoxDescent;
    } else {
        ascent = 0;
        descent = 0;
    }
    
    Result.ascent = ascent;
    Result.descent = descent;
    Result.height = ascent + descent;

    return Result;
}

var Result = {};

export default GetDefaultTextHeight;