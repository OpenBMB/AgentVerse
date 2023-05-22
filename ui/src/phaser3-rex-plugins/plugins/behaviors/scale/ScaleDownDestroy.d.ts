import Scale from './Scale';

export default function ScaleDownDestroy(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    orientation?: number | string,
    ease?: string,
    scale?: Scale
): Scale;

export default function ScaleDownDestroy(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    orientation?: number | string,
    ease?: string,
    destroyMode?: boolean,
    scale?: Scale
): Scale;