export default WaitEvents;

declare namespace WaitEvents {
    type CompleteCallbackType = () => void;
}

declare class WaitEvents {
    constructor(
        completeCallback?: WaitEvents.CompleteCallbackType,
        scope?: object
    );

    setCompleteCallback(
        completeCallback: WaitEvents.CompleteCallbackType,
        scope?: object
    ): this;

    waitCallback(): this;

    waitEvent(
        eventEmitter: Phaser.Events.EventEmitter,
        eventName: string
    ): this;

    remove(
        callback: WaitEvents.CompleteCallbackType,
    ): this;

    clear(): this;

    readonly noWaitEvent: boolean;
}