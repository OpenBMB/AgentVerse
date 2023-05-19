import ComponentBase from '../../utils/componentbase/ComponentBase';

export default Anchor;

declare namespace Anchor {
    type OnResizeCallbackType = (
        width: number,
        height: number,
        gameObject: Phaser.GameObjects.GameObject,
        anchor: Anchor
    ) => void;

    type OnUpdateViewportCallbackType = (
        viewport: Phaser.Geom.Rectangle,
        gameObject: Phaser.GameObjects.GameObject,
        anchor: Anchor
    ) => void;

    interface IConfig {
        left?: string, right?: string, centerX?: string, x?: string,
        top?: string, bottom?: string, centerY?: string, y?: string,

        width?: string, height?: string,

        onResizeCallback?: OnResizeCallbackType,
        onResizeCallbackScope?: unknown,

        onUpdateViewportCallback?: OnUpdateViewportCallbackType,
        onUpdateViewportCallbackScope?: unknown,

        enable?: boolean
    }
}

declare class Anchor extends ComponentBase {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Anchor.IConfig
    );

    resetFromJSON(config: Anchor.IConfig): this;

    setUpdateViewportCallback(
        callback?: Anchor.OnUpdateViewportCallbackType,
        scope?: object
    ): this;

    anchor(): this;

    autoAnchor(enable?: boolean): this;
}
