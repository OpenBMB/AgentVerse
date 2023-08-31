import TimerTask from '../timerticktask/TimerTask.js';

export default EaseValueTaskBase;

declare class EaseValueTaskBase extends TimerTask {
    setDelay(time: number): this;
    delay: number;

    setDuration(time: number): this;
    duration: number;

    setEase(ease: string): this;
    ease: string;

    start(): this;
    stop(): this;
    restart(): this;

    pause(): this;
    resume(): this;
    complete(): this;
    readonly isRunning: boolean;
}