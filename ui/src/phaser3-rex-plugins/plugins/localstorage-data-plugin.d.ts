import DataManager from './localstorage-data';
import Extend from './storage/localstorage/data/Extend';

export default class DataManagerPlugin extends Phaser.Plugins.BasePlugin {
    add(
        config?: DataManager.IConfig
    ): DataManager;

    add(
        parent: object,
        config?: DataManager.IConfig
    ): DataManager;

    add(
        parent: object,
        eventEmitter?: Phaser.Events.EventEmitter,
        config?: DataManager.IConfig
    ): DataManager;

    extend: typeof Extend;

    setItem(
        dataKey: string, name: string,
        value: any
    ): this;

    getItem(
        dataKey: string, name: string,
    ): any;

    removeItem(
        dataKey: string, name: string,
    ): this;    
}