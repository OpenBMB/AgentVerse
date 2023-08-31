// import * as Phaser from 'phaser';
import Canvas from '../canvas/Canvas';

export default Chart;

declare namespace Chart {
    type IndexType = number | string;

    interface IConfig {

    }
}

declare class Chart extends Canvas {
    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        config?: Chart.IConfig
    );

    setChart(config: Chart.IConfig): this;

    getChartDataset(
        datasetIndex: Chart.IndexType
    ): { [index: Chart.IndexType]: number };

    getChartData(
        datasetIndex: Chart.IndexType,
        dataIndex: Chart.IndexType
    ): number;

    setChartData(
        datasetIndex: Chart.IndexType,
        dataIndex: Chart.IndexType,
        value: number
    ): this;

    updateChart(): this;

    chart: any;
}