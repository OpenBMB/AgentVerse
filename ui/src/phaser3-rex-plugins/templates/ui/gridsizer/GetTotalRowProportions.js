var GetTotalRowProportions = function () {
    var result = 0,
        proportion;
    for (var i = 0; i < this.rowCount; i++) {
        proportion = this.rowProportions[i];
        if (proportion > 0) {
            result += proportion;
        }
    }
    return result;
}

export default GetTotalRowProportions;