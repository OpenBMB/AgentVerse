export default DataManager;

declare class DataManager extends Phaser.Data.DataManager {
    constructor(
        parent: object,
        eventEmitter?: Phaser.Events.EventEmitter
    );

    constructor(
        parent: object,
        eventEmitter?: Phaser.Events.EventEmitter,
        config?: object
    );

    commit(alias?: string): this;

    restore(
        version?: string | number,
        restoreFromVersion0?: boolean
    ): this;

    set version(value: string | number);
    get version(): number;
    readonly lastVersion: number;

    readonly versionAlias: string;
    readonly versionAliases: string[];

    toJSON(): object;
    resetFromJSON(o?: object): this;
}