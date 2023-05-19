export default ParticlesAlongBounds;

declare namespace ParticlesAlongBounds {

    interface IConfig {
        textureKey: string,
        textureFrames?: string |
        number |
        (string | number)[] |
        {
            frames: (string | number)[],
            cycle?: boolean,
            quantity?: number
        },
        padding?: number | { left?: number, right?: number, top?: number, bottom?: number },

        blendMode?: Phaser.BlendModes | string,
        lifespan?: number,
        stepRate?: number,
        spread?: number,

        scale?: Phaser.Types.GameObjects.Particles.EmitterOpOnEmitType | Phaser.Types.GameObjects.Particles.EmitterOpOnUpdateType
        alpha?: Phaser.Types.GameObjects.Particles.EmitterOpOnEmitType | Phaser.Types.GameObjects.Particles.EmitterOpOnUpdateType
        tint?: number,

        repeat?: number,
        gravityX?: number,
        gravityY?: number,
        duration?: number
    }
}

declare function ParticlesAlongBounds(
    gameObject: Phaser.GameObjects.GameObject,
    config?: ParticlesAlongBounds.IConfig,
): Phaser.GameObjects.Particles.ParticleEmitter;