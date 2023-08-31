import ComponentBase from '../../utils/componentbase/ComponentBase';

export default Boids;

declare namespace Boids {

    interface IConfig {
        separation?: {
            weight?: number,
            distance?: number,
        },

        cohesion?: {
            weight?: number,
            distance?: number,
        },

        alignment?: {
            weight?: number,
            distance?: number,
        },
    }
}

declare class Boids extends ComponentBase {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Boids.IConfig
    );

    readonly output: Phaser.Math.Vector2;

    setSeparationParameters(weight: number, distance: number): this;
    setCohesionParameters(weight: number, distance: number): this;
    setAlignmentParameters(weight: number, distance: number): this;

    update(neighbors: Phaser.GameObjects.GameObject[]): this;
}