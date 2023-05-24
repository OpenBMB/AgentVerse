import EaseValueTaskBase from "../../utils/componentbase/tweentask/EaseValueTaskBase";

export default EaseMove;

declare namespace EaseMove {
    type ModeType = 0 | 1 | 2 | 'stop' | 'destroy' | 'yoyo';

    interface IConfig {
        mode?: ModeType,

        x?: number, y?: number,
        startX?: number, startY?: number,
        endX?: number, endY?: number,

        duration?: number,
        delay?: number,
        ease?: string
    }

    namespace Events {
        type CompleteCallbackType = (
            gameObject: Phaser.GameObjects.GameObject,
            easeMove: EaseMove
        ) => void;
    }
}

declare class EaseMove extends EaseValueTaskBase {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: EaseMove.IConfig
    )

    setMode(mode: EaseMove.ModeType): this;
    mode: number;

    setTargetPosition(x: number, y: number): this;
    setTargetPosition(
        config?: {
            startX?: number, startY?: number,
            endX?: number, endY?: number,
        }
    ): this;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}