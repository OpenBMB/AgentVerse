export default DataManager;

declare namespace DataManager {
    interface IConfig {
        name?: string,
        load?: boolean,
        default?: { [key: string]: any },
        reset?: boolean
    }
}

declare class DataManager extends Phaser.Data.DataManager {
    constructor(
        config?: DataManager.IConfig
    );

    constructor(
        parent?: object,
        config?: DataManager.IConfig
    );

    constructor(
        parent?: object,
        eventEmitter?: Phaser.Events.EventEmitter,
        config?: DataManager.IConfig
    );

    load(
        defaultValue?: { [key: string]: any },
        reset?: boolean
    ): this;

    getDefaultValue(key: string): any;
}