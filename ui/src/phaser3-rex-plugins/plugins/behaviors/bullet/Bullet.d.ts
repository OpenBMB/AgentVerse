import TickTask from '../../utils/componentbase/TickTask';

export default Bullet;

declare namespace Bullet {

    interface IConfig {
        speed?: number,
        enable?: boolean,
        wrap?: boolean,
        padding?: number,

        angle?: number,
        rotation?: number,
    }
}

declare class Bullet extends TickTask {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Bullet.IConfig
    )

    setEnable(enable?: boolean): this;
    enable: boolean;

    setSpeed(speed: number): this;
    speed: number;

    setAngle(angle?: number): this;
    angle: number | undefined;

    setRotation(rotation?: number): this;
    rotation: number | undefined;
}