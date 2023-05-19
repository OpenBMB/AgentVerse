import { EventEmitter } from 'eventemitter3';

export default RealTimeTimers;

declare namespace RealTimeTimers {
    interface ITimer {
        name: string | number,
        start: number,
        period: number,
        data?: any
    }

    interface IState {
        timers?: ITimer[];
    }

    type GetTimestampCallbackType = () => number;

    interface IConfig extends IState {
        getTimestampCallback?: GetTimestampCallbackType;
        startTimestamp?: number;
    }

    interface IPeriod {
        day?: number, d?: number,
        hour?: number, h?: number,
        minute?: number, m?: number,
        second?: number, s?: number,
    }

    interface IProgress {
        name: string | number,
        period: number,
        elapsed: number,
        progress: number,
        timer: ITimer
    }
}

declare class RealTimeTimers extends EventEmitter {
    constructor(
        config?: RealTimeTimers.IConfig
    );

    timers: RealTimeTimers.ITimer[];

    resetFromJSON(state?: RealTimeTimers.IState): this;
    toJSON(): RealTimeTimers.IState;

    setStartTimestamp(timestamp?: number): this;
    setGetTimestampCallback(callback?: RealTimeTimers.GetTimestampCallbackType): this;

    addTimer(
        name: string | number,
        period: number | RealTimeTimers.IPeriod,
        data?: any,
        currentTimestamp?: number
    ): this;

    incTimerPeriod(
        name: string | number,
        period: number | RealTimeTimers.IPeriod
    ): this;

    getExpiredTimers(currentTimestamp?: number): RealTimeTimers.ITimer[];
    popExpiredTimers(currentTimestamp?: number): RealTimeTimers.ITimer[];
    getTimersProgress(currentTimestamp?: number): RealTimeTimers.IProgress[];

    getTimers(): RealTimeTimers.ITimer[];
    getTimers(name: string | number): RealTimeTimers.ITimer[];
    readonly lastTimer: RealTimeTimers.ITimer;
    readonly length: number;

    removeTimers(name: string | number,): this;
    removeTimers(timer: RealTimeTimers.ITimer): this;
    removeTimers(timers: RealTimeTimers.ITimer[]): this;

    clearTimers(): this;

    emitUpdateEvent(): this;
}