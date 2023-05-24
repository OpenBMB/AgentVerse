export default Raycaster;

declare namespace Raycaster {
    interface IConfig {
        maxRayLength?: number
    }

    interface IResult {
        gameObject: Phaser.GameObjects.GameObject,
        polygon: Phaser.Geom.Polygon,
        segment: Phaser.Geom.Line,
        x: number,
        y: number,
        reflectAngle: number,
    }
}

declare class Raycaster {
    addObstacle(
        gameObject: Phaser.GameObjects.GameObject,
        polygon?: Phaser.Geom.Polygon
    ): this;

    addObstacle(
        gameObjects: Phaser.GameObjects.GameObject[]
    ): this;

    removeObstacle(
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    clearObstacle(): this;

    updateObstacle(
        gameObject: Phaser.GameObjects.GameObject,
        polygon?: Phaser.Geom.Polygon
    ): this;

    rayToward(
        x: number, y: number,
        angle: number
    ): Raycaster.IResult | false;

}