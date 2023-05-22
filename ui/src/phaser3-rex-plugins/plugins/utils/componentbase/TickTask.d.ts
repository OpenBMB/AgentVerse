
import ComponentBase from './ComponentBase';

export default TickTask;

declare namespace TickTask {
    interface IConfig extends ComponentBase.IConfig {
        tickingMode?: 0 | 'no' | 1 | 'lazy' | 2 | 'always'
    }
}

declare class TickTask extends ComponentBase {
    constructor(
        parent?: Object,
        config?: TickTask.IConfig
    );

    start(): this;
    pause(): this;
    resume(): this;
    stop(): this;
    complete(): this;
    isRunning: boolean;
    isPaused: boolean;
}