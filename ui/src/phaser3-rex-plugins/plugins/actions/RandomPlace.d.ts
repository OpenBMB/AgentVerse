export default RandomPlace;

declare namespace RandomPlace {

    type Vec2Type = { x: number, y: number };
    type GetPositionCallback = (out?: Vec2Type) => Vec2Type

    type AreaType = {
        getRandomPoint: GetPositionCallback
    }

    interface IConfig {
        radius?: number,
        getPositionCallback?: GetPositionCallback
        area?: AreaType,
    }
}

declare function RandomPlace(
    gameObjects: Phaser.GameObjects.GameObject,
    config: RandomPlace.IConfig
): Phaser.GameObjects.GameObject;

declare function RandomPlace(
    config: {
        gameObjects: Phaser.GameObjects.GameObject,
        radius?: number,
    }
): Phaser.GameObjects.GameObject;