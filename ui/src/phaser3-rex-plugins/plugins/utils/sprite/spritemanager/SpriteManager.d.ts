import GOManager from '../../gameobject/gomanager/GOManager';

export default SpriteManager;

declare namespace SpriteManager {

    type CreateCallbackType = (
        scene: Phaser.Scene,
        textureKey: string,
        frameName: string | number
    ) => Phaser.GameObjects.GameObject;

    interface IConfig extends GOManager.IConfig {
        createCallback?: 'sprite' | 'image' | CreateCallbackType,
    }
}

declare class SpriteManager extends GOManager {
    constructor(
        scene: Phaser.Scene,
        config?: SpriteManager.IConfig
    )

    add(
        name: string,
        textureKey: string,
        frameName?: string | number
    ): this;

    setCreateGameObjectCallback(
        callback?: 'sprite' | 'image' | SpriteManager.CreateCallbackType
    ): this;

    playAnimation(
        name: string,
        key: string,
    ): this;

    stopAnimation(name: string): this;

    chainAnimation(
        name: string,
        keys: string | string[] | Phaser.Types.Animations.PlayAnimationConfig | Phaser.Types.Animations.PlayAnimationConfig[]
    ): this;

    pauseAnimation(name: string): this;

    setTexture(
        name: string,
        textureKey: string,
        frameName: string | number
    ): this;
}