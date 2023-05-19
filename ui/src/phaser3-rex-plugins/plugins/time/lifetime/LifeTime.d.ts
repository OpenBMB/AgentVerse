import Clock from "../clock/Clock";

export default LifeTime;

declare namespace LifeTime {
    interface IConfig {
        lifeTime?: number,
        destroy?: boolean,
        start?: boolean
    }

    namespace Events {
        type CompleteCallbackType = (
            gameObject: Phaser.GameObjects.GameObject,
            lifeTime: LifeTime
        ) => void;
    }
}

declare class LifeTime extends Clock {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: LifeTime.IConfig
    );
    readonly gameObject: Phaser.GameObjects.GameObject;

    setLifeTime(time: number): this;
    addToLifeTime(time: number): this;
    readonly lifeTime: number;
    readonly remainder: number;
    readonly isAlive: boolean;


}