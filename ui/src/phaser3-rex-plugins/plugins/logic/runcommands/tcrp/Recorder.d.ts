import ComponentBase from '../../../utils/componentbase/ComponentBase';

export default Recorder;

declare namespace Recorder {
    interface IConfig {

    }
}

declare class Recorder extends ComponentBase {
    constructor(
        parent: Phaser.Scene | Phaser.GameObjects.GameObject,
    );

    start(startAt?: number): this;

    addCommand(
        command: any[],
        offset?: number
    ): this;

    getCommands(isRef?: boolean): any[];

    clear(): this;

    pause(): this;
    resume(): this;
    stop(): this;

    seek(time: number): this;

    readonly isRecording: boolean;
    readonly now: boolean;

    setTimeScale(timeScale: number): this;
    timeScale: number;

}