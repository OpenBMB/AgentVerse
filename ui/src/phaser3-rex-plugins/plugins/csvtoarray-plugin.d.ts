import CSVToArray from './csvtoarray';

export default class CSVToArrayPlugin extends Phaser.Plugins.BasePlugin {
    convert(
        csvString: string,
        config?: CSVToArray.IConfig
    ): any[][];

}