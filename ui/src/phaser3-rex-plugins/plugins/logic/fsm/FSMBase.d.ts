import EventEmitter from '../../utils/eventemitter/EventEmitter';

export default FSMBase;

declare namespace FSMBase {

    interface IStateConfig {
        name?: string,
        next?: string | (() => string),
        enter?: Function,
        exit?: Function,
    }

    interface IConfig {
        start?: string,
        states?: { [name: string]: IStateConfig },

        init?: Function,

        extend?: {
            [name: string]: any,
        },

        enable?: boolean,

        eventEmitter?: EventEmitter | false,
    }

    namespace Events {
        type StateChangeCallbackType = (state: FSMBase) => void;
        type ExitStateCallbackType = (state: FSMBase) => void;
        type EnterStateCallbackType = (state: FSMBase) => void;
    }
}

declare class FSMBase extends EventEmitter {
    constructor(config?: FSMBase.IConfig);

    start(newState: string): this;
    next(): this;
    goto(nextState: string): this;
    state: string;
    readonly prevState: string;

    setEnable(enable?: boolean): this;
    toggleEnable(): this;
    enable: boolean;

    addState(
        name: string,
        state: FSMBase.IStateConfig
    ): this;
    addState(state: FSMBase.IStateConfig): this;

    addStates(
        states: { [name: string]: FSMBase.IStateConfig },
    ): this;
    addStates(
        states: FSMBase.IStateConfig[]
    ): this;

    runMethod(
        methodName: string,
        ...args: unknown[]
    ): unknown;
}