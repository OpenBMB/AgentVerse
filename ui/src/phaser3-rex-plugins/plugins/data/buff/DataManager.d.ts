export default class DataManager extends Phaser.Data.DataManager {
    constructor(
        parent: object,
        eventEmitter?: Phaser.Events.EventEmitter,
    );

    setBaseValue(key: string, value: number): this;

    removeBaseValue(key: string): this;

    getBaseValue(key: string): number;

    setBuff(
        key: string,
        buffKey: string,
        value: number | string
    ): this;

    removeBuff(key: string, buffKey: string,): this;

    getBuffValue(key: string, buffKey: string,): number;

    setMin(key: string, min: number): this;

    setMax(key: string, max: number): this;

    setBounds(key: string, min: number, max: number): this;

    getMinBound(key: string): number;

    getMaxBound(key: string): number;

}