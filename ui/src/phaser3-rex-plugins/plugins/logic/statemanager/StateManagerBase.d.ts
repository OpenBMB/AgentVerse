import EventEmitter from '../../utils/eventemitter/EventEmitter';

export default StateManagerBase;

declare namespace StateManagerBase {

    interface IState {
        name?: string,
        next?: string | (() => string),
        enter?: Function,
        exit?: Function,
    }

    interface IConfig {
        eventEmitter?: EventEmitter | false,
    }

    namespace Events {
        type StateChangeCallbackType = (state: StateManagerBase) => void;
        type ExitStateCallbackType = (state: StateManagerBase) => void;
        type EnterStateCallbackType = (state: StateManagerBase) => void;
    }
}

declare class StateManagerBase extends EventEmitter {
    constructor(config?: StateManagerBase.IConfig);

    start(newState: string): this;
    next(): this;
    goto(nextState: string): this;
    state: string;
    readonly prevState: string;
    readonly stateList: string[];

    setEnable(enable?: boolean): this;
    toggleEnable(): this;
    enable: boolean;

    addState(
        name: string,
        state: StateManagerBase.IState
    ): this;
    addState(
        state: StateManagerBase.IState
    ): this;

    addStates(
        state: StateManagerBase.IState[]
    ): this;
    addStates(
        states: { [name: string]: StateManagerBase.IState },
    ): this;

    runMethod(
        methodName: string,
        ...args: unknown[]
    ): unknown;
}