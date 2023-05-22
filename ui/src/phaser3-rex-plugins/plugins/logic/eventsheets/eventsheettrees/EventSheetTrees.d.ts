import { EventEmitter } from 'eventemitter3';

export default EventSheetTrees;

declare namespace EventSheetTrees {
    interface IConfig {
        taskHandlers?: Object,
        parallel?: boolean,
    }
}

declare class EventSheetTrees extends EventEmitter {
    constructor(config?: EventSheetTrees.IConfig);

    readonly memory: { [key: string]: any };

    setTaskHandlers(taskHandlers?: Object): this;

    addEventSheet(content?: string, config?: any): this;

    clearAllEventSheets(): this;

    getEventSheetTitleList(): string[];

    removeEventSheet(title: string): this;

    dumpTrees(): Object[];

    loadTrees(data: Object[]): this;

    setData(key: string, value: any): this;

    hasData(key: string): this;

    toggleData(key: string): this;

    getData(key: string): any;

    dumpState(includeTree?: boolean): Object;

    loadState(state: Object): this;

    evalExpression(expression: any): any;

    renderString(template: string): string;

    start(): this;

    stop(): this;
}