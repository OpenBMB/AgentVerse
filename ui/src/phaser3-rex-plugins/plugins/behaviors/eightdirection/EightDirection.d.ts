import TickTask from '../../utils/componentbase/TickTask';

export default EightDirection;

declare namespace EightDirection {

    type DirectionModeType = 0 | 1 | 2 | 3 | 'up&down' | 'left&right' | '4dir' | '8dir';
    type CursorKeys = {
        up: Phaser.Input.Keyboard.Key,
        down: Phaser.Input.Keyboard.Key,
        left: Phaser.Input.Keyboard.Key,
        right: Phaser.Input.Keyboard.Key
    }

    interface IConfig {
        speed?: number,
        dir?: DirectionModeType,
        rotateToDirection?: boolean,
        enable?: boolean,
        wrap?: boolean,
        padding?: number,
        cursorKeys?: CursorKeys
    }
}

declare class EightDirection extends TickTask {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: EightDirection.IConfig
    )

    setEnable(enable?: boolean): this;
    enable: boolean;

    setCursorKeys(
        cursorKeys: EightDirection.CursorKeys
    ): this;
    cursorKeys: EightDirection.CursorKeys;

    setSpeed(speed: number): this;
    speed: number;

    setRotateToTarget(enable?: boolean): this;
    rotateToTarget: boolean;

    setDirMode(dir: EightDirection.DirectionModeType): this;
    dirMode: number;

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