var GetChartData = function (datasetIndex, dataIndex) {
    var dataset = this.getChartDataset(datasetIndex);
    if (dataset === undefined) {
        return undefined;
    }
    if (typeof (dataIndex) === 'string') {
        var labels = this.chart.data.labels;
        dataIndex = labels.indexOf(dataIndex);
        if (dataIndex === -1) {
            return undefined;
        }
    }
    return dataset.data[dataIndex];
}
export default GetChartData;