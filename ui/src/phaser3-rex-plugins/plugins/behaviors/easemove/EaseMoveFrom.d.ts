import EaseMove from './EaseMove';

declare function EaseMoveFrom(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    startX: number | string | undefined,
    startY: number | string | undefined,
    ease?: string,
    destroyMode?: boolean,
    easeMove?: EaseMove
): EaseMove;

declare function EaseMoveFrom(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    startX: number | string | undefined,
    startY: number | string | undefined,
    ease?: string,
    easeMove?: EaseMove
): EaseMove;

export default EaseMoveFrom;