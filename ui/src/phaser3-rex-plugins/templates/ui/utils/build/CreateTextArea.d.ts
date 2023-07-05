import TextArea from '../../textarea/TextArea';
import { GeneralCreateGameObjectCallbackType } from './GeneralCreateGameObjectCallbackType';
import CreateBackground from './CreateBackground';
import CreateText from './CreateText';

export default CreateTextArea;

declare namespace CreateTextArea {
    type SliderInputTypes = 0 | 1 | -1 | 'drag' | 'pan' | 'click' | 'none';
    type SliderPositionTypes = 0 | 1 | 'right' | 'left'

    interface IConfig {
        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            text?: number | {
                left?: number, right?: number, top?: number, bottom?: number,
            },
        },

        background?: CreateBackground.IConfig,

        text?: CreateText.IConfig,
        textWidth?: number | undefined,
        textHeight?: number | undefined,
        textMask?: boolean,
        alwaysScrollable?: boolean,

        slider?: ({
            track?: CreateBackground.IConfig,
            thumb?: CreateBackground.IConfig,

            input?: SliderInputTypes,
            position?: SliderPositionTypes,

            hideUnscrollableSlider?: boolean,
            adaptThumbSize?: boolean,
            minThumbSize?: number,

            buttons?: {
                top?: Phaser.GameObjects.GameObject,
                bottom?: Phaser.GameObjects.GameObject,
                left?: Phaser.GameObjects.GameObject,
                right?: Phaser.GameObjects.GameObject,
                step?: number
            }
        } |
            boolean
        ),

        scroller?: (
            {
                threshold?: number,
                slidingDeceleration?: number | false,
                backDeceleration?: number | false,
                dragRate?: number,
            } |
            boolean
        ),

        mouseWheelScroller?: (
            {
                focus?: boolean,
                speed?: number,
            } |
            boolean
        ),

        clamplChildOY?: boolean,

    }

    interface ICreatorsConfig {
        background?: GeneralCreateGameObjectCallbackType,
        text?: GeneralCreateGameObjectCallbackType,
        track?: GeneralCreateGameObjectCallbackType,
        thumb?: GeneralCreateGameObjectCallbackType,
    }
}

declare function CreateTextArea(
    scene: Phaser.Scene,
    config?: CreateTextArea.IConfig,
    creators?: CreateTextArea.ICreatorsConfig,
): TextArea;