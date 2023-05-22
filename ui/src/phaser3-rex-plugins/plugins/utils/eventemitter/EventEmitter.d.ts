export default class EventEmitter {
    shutdown(): void;
    destroy(): void;

    eventNames(): (string | symbol)[];
    listeners(event: string | symbol): Function[];
    listenerCount(event: string | symbol): number;
    emit(event: string | symbol, ...args: any[]): boolean;
    on(event: string | symbol, fn: Function, context?: any): this;
    addListener(event: string | symbol, fn: Function, context?: any): this;
    once(event: string | symbol, fn: Function, context?: any): this;
    removeListener(event: string | symbol, fn?: Function, context?: any, once?: boolean): this;
    off(event: string | symbol, fn?: Function, context?: any, once?: boolean): this;
    removeAllListeners(event?: string | symbol): this;
}