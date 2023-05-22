import ComponentBase from '../ComponentBase';

export default TweenTask;

declare class TweenTask extends ComponentBase {
    start(config: Object): this;
    stop(): this;
    restart(config: Object): this;

    pause(): this;
    resume(): this;
    complete(): this;
    readonly isRunning: boolean;
}