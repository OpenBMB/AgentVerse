import EventEmitter from "../../../utils/eventemitter/EventEmitter";

export default Sequence;

declare namespace Sequence {
    interface IConfig {
        yoyo?: boolean,
        repeat?: number,
        loop?: boolean,

        eventEmitter?: EventEmitter | false,
    }

    namespace Events {
        type CompleteCallbackType = (actionScope: object, seq: Sequence) => void;
    }
}

declare class Sequence extends EventEmitter {
    constructor(config?: Sequence.IConfig);

    load(
        commands: any[],
        actionScope: object
    ): this;

    start(): this;

    cancel(): this;

    stop(): this;

    readonly state: number;
    readonly completed: boolean;

    setYoyo(yoyo?: boolean): this;
    yoyo: boolean;

    setRepeat(count: number): this;
    readonly repeat: number;

    setLoop(loop?: boolean): this;
    loop: boolean;
}