// import * as Phaser from 'phaser';
import FaceContainer from '../utils/FaceContainer';
import Image from '../image/Image';
import RenderTexture from '../rendertexture/RenderTexture';

export default Card;

declare namespace Card {

    type FaceTypes = 0 | 1 | 'front' | 'back';

    type FaceDefType = { key: string, frame?: string } |
    { width: number, height: number } |
        Image |
        RenderTexture;

    type OrientationTypes = 0 | 1 | 'x' | 'y' | 'horizontal' | 'vertical';

    type FlipDirTypes = 0 | 1 | 'right' | 'left' | 'left-to-right' | 'right-to-left';
    interface IConfigFlip {
        frontToBack?: FlipDirTypes,
        backToFront?: FlipDirTypes,
        duration?: number,
        ease?: string,
        delay?: number,
    }

    interface IConfig {
        x?: number,
        y?: number,
        width?: number,
        height?: number,

        face?: FaceTypes,
        back?: FaceDefType,
        front?: FaceDefType,

        orientation?: OrientationTypes,

        flip?: IConfigFlip | false,
    }

    namespace Events {
        type FlipCompleteCallbackType = () => void;
    }

    class Flip extends Phaser.Events.EventEmitter {
        flip(
            duration?: number,
            repeat?: number
        ): this;

        flipRight(
            duration?: number,
            repeat?: number
        ): this;

        flipLeft(
            duration?: number,
            repeat?: number
        ): this;

        stop(): this;

        setDuration(duration: number): this;
        duration: number;

        setEase(ease: string): this;
        ease: string;

        readonly isRunning: boolean;
    }

}

declare class Card extends FaceContainer {
    constructor(
        scene: Phaser.Scene,
        config?: Card.IConfig
    );

    setFace(face: Card.FaceTypes): this;
    toggleFace(): this;
    face: number;

    frontFace: Image | RenderTexture;
    backFace: Image | RenderTexture;
    faces: {
        front: Image | RenderTexture,
        back: Image | RenderTexture,
    };

    flip: Card.Flip | undefined;
}