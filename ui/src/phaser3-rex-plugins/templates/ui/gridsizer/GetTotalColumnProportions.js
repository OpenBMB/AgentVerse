var GetTotalColumnProportions = function () {
    var result = 0,
        proportion;
    for (var i = 0; i < this.columnCount; i++) {
        proportion = this.columnProportions[i];
        if (proportion > 0) {
            result += proportion;
        }
    }
    return result;
}

export default GetTotalColumnProportions;