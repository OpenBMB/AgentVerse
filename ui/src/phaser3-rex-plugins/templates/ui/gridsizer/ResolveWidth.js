import ResolveWidthBase from '../basesizer/ResolveWidth.js';

var ResolveWidth = function (width) {
    var width = ResolveWidthBase.call(this, width);

    // Get proportionLength
    if (this.proportionWidthLength === undefined) {
        var totalColumnProportions = this.totalColumnProportions;
        if (totalColumnProportions > 0) {
            var remainder = width - this.getChildrenWidth(false);
            if (remainder >= 0) {
                this.proportionWidthLength = remainder / totalColumnProportions;
            } else {
                // Warning
            }
        } else {
            this.proportionWidthLength = 0;
        }
    }

    return width;
}

export default ResolveWidth;