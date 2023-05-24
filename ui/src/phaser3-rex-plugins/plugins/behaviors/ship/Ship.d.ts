import TickTask from '../../utils/componentbase/TickTask';

export default Ship;

declare namespace Ship {

    type CursorKeys = {
        up: Phaser.Input.Keyboard.Key,
        down: Phaser.Input.Keyboard.Key,
        left: Phaser.Input.Keyboard.Key,
        right: Phaser.Input.Keyboard.Key
    }

    interface IConfig {

        maxSpeed?: number,
        acceleration?: number,
        drag?: number,
        turnSpeed?: number,
        enable?: boolean,
        wrap?: boolean,
        padding?: number,
        cursorKeys?: CursorKeys
    }
}

declare class Ship extends TickTask {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Ship.IConfig
    )

    setEnable(enable?: boolean): this;
    enable: boolean;

    setCursorKeys(
        cursorKeys: Ship.CursorKeys
    ): this;
    cursorKeys: Ship.CursorKeys;

    setMaxSpeed(maxSpeed: number): this;
    maxSpeed: number;

    setAcceleration(acceleration: number): this;
    acceleration: number;

    setDrag(drag: number): this;
    drag: number;

    setTurnSpeed(angularVelocity: number): this;
    angularVelocity: number;

    setWrapMode(
        wrap?: boolean,
        padding?: number
    ): this;
    wrap: boolean;
    padding: number;

    readonly isLeft: boolean;
    readonly isRight: boolean;
    readonly isUp: boolean;
    readonly isDown: boolean;
}