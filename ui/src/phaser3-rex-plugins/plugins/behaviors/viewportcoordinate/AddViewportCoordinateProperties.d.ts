export default AddViewportCoordinateProperties;

declare namespace AddViewportCoordinateProperties {
    interface PolarCoordinateGameObject extends Phaser.GameObjects.GameObject {
        vp: Phaser.Geom.Rectangle;
        vpx: number;
        vpy: number;
        vpxOffset: number;
        vpyOffset: number;
    }

    type TransformCallbackType0 =
        (
            vpx: number,
            vpy: number,
            viewport: Phaser.Geom.Rectangle,
            gameObject: Phaser.GameObjects.GameObject,
        ) => void;

    type TransformCallbackType1 =
        (
            vpx: number,
            vpy: number,
            vpxOffset: number,
            vpyOffset: number,
            viewport: Phaser.Geom.Rectangle,
            gameObject: Phaser.GameObjects.GameObject,
        ) => void;

    type TransformCallbackType = TransformCallbackType0 | TransformCallbackType1;
}

declare function AddViewportCoordinateProperties(
    gameObject: Phaser.GameObjects.GameObject,
    viewport?: Phaser.Geom.Rectangle,
    vpx?: number,
    vpy?: number,
    vpxOffset?: number,
    vpyOffset?: number,
    transformCallback?: AddViewportCoordinateProperties.TransformCallbackType
): AddViewportCoordinateProperties.PolarCoordinateGameObject;

declare function AddViewportCoordinateProperties(
    gameObject: Phaser.GameObjects.GameObject,
    viewport?: Phaser.Geom.Rectangle,
    vpx?: number,
    vpy?: number,
    transformCallback?: AddViewportCoordinateProperties.TransformCallbackType
): AddViewportCoordinateProperties.PolarCoordinateGameObject;

declare function AddViewportCoordinateProperties(
    gameObject: Phaser.GameObjects.GameObject,
    viewport?: Phaser.Geom.Rectangle,
    transformCallback?: AddViewportCoordinateProperties.TransformCallbackType
): AddViewportCoordinateProperties.PolarCoordinateGameObject;