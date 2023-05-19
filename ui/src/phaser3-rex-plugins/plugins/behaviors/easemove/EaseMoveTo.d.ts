import EaseMove from './EaseMove';

declare function EaseMoveTo(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    endX: number | string | undefined,
    endY: number | string | undefined,
    ease?: string,
    destroyMode?: boolean,
    easeMove?: EaseMove
): EaseMove;

declare function EaseMoveTo(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    endX: number | string | undefined,
    endY: number | string | undefined,
    ease?: string,
    easeMove?: EaseMove
): EaseMove;

export default EaseMoveTo;
