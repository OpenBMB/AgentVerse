import ComponentBase from '../../utils/componentbase/ComponentBase';

export default PathFollower;

declare namespace PathFollower {

    interface IConfig {
        path?: Phaser.Curves.Path,
        t?: number,
        rotateToPath?: boolean,
        rotationOffset?: number,
        angleOffset?: number,

        spacedPoints?: {
            divisions?: number,
            stepRate?: number
        } | boolean
    }
}

declare class PathFollower extends ComponentBase {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: PathFollower.IConfig
    );

    setT(t: number): this;
    t: number;

    setPath(path: Phaser.Curves.Path): this;
    path: Phaser.Curves.Path;

    setRotateToPath(
        rotateToPath: boolean,
        rotationOffset?: number
    ): this;
    rotateToPath: boolean;
    rotationOffset: number;

    setSpacedPointsMode(
        divisions?: number | boolean,
        stepRate?: number
    ): this;
}