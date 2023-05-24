export default CSVScenario;

declare namespace CSVScenario {
    type TimeUnitType = 0 | 1 | 'ms' | 's' | 'sec';
    type ConvertCallbackType = (s: string, instruction: any[]) => any;

    interface IConfig {
        timeUnit?: TimeUnitType,
        prefix?: RegExp,
        argsConvert?: true | ConvertCallbackType,
        argsConvertScope?: object,
        delimiter?: string,
        translateCommandNameCallback?: (commandName: string) => string,
    }

    interface IStartConfig {
        label?: string
        offset?: number
    }

    namespace Events {
        type CompleteCallbackType = (
            scope: object, scenario: CSVScenario
        ) => void;

        type LabelChangeCallbackType = (
            lastLabel: string, prevLabel: string,
            scope: object, scenario: CSVScenario
        ) => void;

        type LogCallbackType = (
            msg: string,
            scope: object, scenario: CSVScenario
        ) => void;

        type ErrorCallbackType = (
            msg: string,
            scope: object, scenario: CSVScenario
        ) => void;
    }
}

declare class CSVScenario extends Phaser.Events.EventEmitter {
    constructor(
        scene: Phaser.Scene,
        config?: CSVScenario.IConfig
    );

    load(
        csvString: string,
        scope: object,
        config?: CSVScenario.IConfig
    ): this;
    scope: object;

    append(csvString: string): this;

    start(config?: CSVScenario.IStartConfig): this;
    play(config?: CSVScenario.IStartConfig): this;
    playPromise(config?: CSVScenario.IStartConfig): Promise<any>;

    continue(eventName: string): this;
    continue(force: true): this;

    pause(): this;

    resume(): this;

    clear(): this;

    readonly isRunning: boolean;
    readonly isPaused: boolean;
    readonly lastLabel: string;
    readonly lastCustomCommandName: string;
    readonly previousLabel: string;

    setTimeScale(timeScale: number): this;
    timeScale: number;
}