var GetChartDataset = function (datasetIndex) {
    if (this.chart === undefined) {
        return undefined;
    }

    if (typeof (datasetIndex) === 'string') {
        var datasets = this.chart.data.datasets, dataset;
        for (var i = 0, cnt = datasets.length; i < cnt; i++) {
            dataset = datasets[i];
            if (dataset.label === datasetIndex) {
                return dataset;
            }
        }
    } else {
        return this.chart.data.datasets[datasetIndex];
    }

    return undefined;
}

export default GetChartDataset;