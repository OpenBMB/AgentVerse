import Fade from './fade';

export default function FadeOutDestroy(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    fade?: Fade
): Fade;

export default function FadeOutDestroy(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    destroyMode?: boolean,
    fade?: Fade
): Fade;