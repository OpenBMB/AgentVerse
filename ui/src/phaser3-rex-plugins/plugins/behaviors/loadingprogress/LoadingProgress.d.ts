export default LoadingProgress;

declare namespace LoadingProgress {
    type ProgressCallbackType = (
        gameObject: Phaser.GameObjects.GameObject,
        progress: number
    ) => void;

    type TransitCallbackType = (
        gameObject: Phaser.GameObjects.GameObject,
        duration: number
    ) => void;

    interface IConfig {
        duration?: {
            in?: number,
            out?: number,
        },

        progress?: ProgressCallbackType,

        transitIn?: TransitCallbackType,

        transitOut?: TransitCallbackType,
    }
}

declare class LoadingProgress extends Phaser.Events.EventEmitter {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: LoadingProgress.IConfig
    );
}