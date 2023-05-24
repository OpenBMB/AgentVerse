import Scale from './Scale';

export default function Yoyo(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    peakValue?: number,
    repeat?: number,
    orientation?: number | string,
    ease?: string,
    scale?: Scale
): Scale;