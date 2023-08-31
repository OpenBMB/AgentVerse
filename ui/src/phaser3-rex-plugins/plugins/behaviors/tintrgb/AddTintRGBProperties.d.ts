export default AddTintRGBProperties;

declare namespace AddTintRGBProperties {
    interface TintRGBGameObject extends Phaser.GameObjects.GameObject {
        tintR: number;
        tintG: number;
        tintB: number;
        tintGray: number;
    }
}

declare function AddTintRGBProperties(
    gameObject: Phaser.GameObjects.GameObject,
    colorRGB?: number
): AddTintRGBProperties.TintRGBGameObject;