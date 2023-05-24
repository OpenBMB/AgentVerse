export default function FadeIn(
    sound: string | Phaser.Sound.BaseSound,
    duration: number,
    endVolume?: number,
    startVolume?: number
): Phaser.Sound.BaseSound;

export default function FadeIn(
    scene: Phaser.Scene,
    sound: string | Phaser.Sound.BaseSound,
    duration: number,
    endVolume?: number,
    startVolume?: number
): Phaser.Sound.BaseSound;