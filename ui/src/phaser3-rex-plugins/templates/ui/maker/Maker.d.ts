import Make from './Make';

export default Maker;

declare namespace Maker {
    type BuilderType = Make.BuilderType;
    type BuildersType = Make.BuildersType;
}

declare class Maker {
    constructor(
        scene: Phaser.Scene,
        styles?: Object | string,
        customBuilders?: Maker.BuildersType
    );

    setScene(scene: Phaser.Scene): this;
    scene: Phaser.Scene;

    setStyles(styles?: Object | string): this;
    addStyle(key: string, style: Object | string): this;
    addStyle(styles: Object | string): this;
    clearStyles(): this;
    styles: Object | undefined;

    setBuilders(builders?: Maker.BuildersType): this;
    addBuilder(key: string, builder: Maker.BuilderType): this;
    clearBuilder(): this;
    customBuilders: Maker.BuildersType | undefined;

    make(
        data: Object | string,
        view?: Object | string
    ): Phaser.GameObjects.GameObject;
}