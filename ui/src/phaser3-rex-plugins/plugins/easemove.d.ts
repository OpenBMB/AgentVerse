import EaseMove from './behaviors/easemove/EaseMove';
import EaseMoveTo from './behaviors/easemove/EaseMoveTo';
import EaseMoveFrom from './behaviors/easemove/EaseMoveFrom';

declare function EaseMoveToDestroy(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    endX: number | string | undefined,
    endY: number | string | undefined,
    ease?: string,
    easeMove?: EaseMove
): EaseMove;

declare function EaseMoveFromDestroy(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    startX: number | string | undefined,
    startY: number | string | undefined,
    ease?: string,
    easeMove?: EaseMove
): EaseMove;

export {
    EaseMove,
    EaseMoveTo, EaseMoveToDestroy,
    EaseMoveFrom, EaseMoveFromDestroy
}