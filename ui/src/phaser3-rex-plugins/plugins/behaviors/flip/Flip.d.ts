// import * as Phaser from 'phaser';
import EaseValueTaskBase from "../../utils/componentbase/tweentask/EaseValueTaskBase";

export default Flip;

declare namespace Flip {

    type FaceTypes = 0 | 1 | 'front' | 'back';

    type FaceDefTypes = string |
    { key?: string, frame?: string } |
        ((gameObject: Phaser.GameObjects.GameObject) => void);

    type OrientationTypes = 0 | 1 | 'x' | 'y' | 'horizontal' | 'vertical';

    interface IConfig {
        face?: FaceTypes,
        front?: FaceDefTypes,
        back?: FaceDefTypes,

        orientation?: OrientationTypes,
        duration?: number,
        delay?: number,
        ease?: string,

        eventEmitter?: boolean | Phaser.Events.EventEmitter
    }

    namespace Events {
        type CompleteCallbackType = (
            gameObject: Phaser.GameObjects.GameObject,
            flip: Flip
        ) => void;
    }

}

declare class Flip extends EaseValueTaskBase {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Flip.IConfig
    )

    flip(duration?: number): this;

    setFace(
        face: 0 | 1 | 'front' | 'back'
    ): this;
    toggleFace(): this;
    face: number;

    setFrontFace(
        key: string |
            ((gameObject: Phaser.GameObjects.GameObject) => void),
        frame?: string
    ): this;
    setBackFace(
        key: string |
            ((gameObject: Phaser.GameObjects.GameObject) => void),
        frame?: string
    ): this;
}