var UpdateChart = function () {
    if (this.chart === undefined) {
        return this;
    }
    this.chart.update();
    return this;
}
export default UpdateChart;