export default MouseWheelToUpDown;

declare namespace MouseWheelToUpDown {
    interface IConfig {
        bounds?: Phaser.Geom.Rectangle,
        sensitiveDistance?: number,
    }
}

declare class MouseWheelToUpDown {
    constructor(
        scene: Phaser.Scene,
        config?: MouseWheelToUpDown.IConfig
    )

    createCursorKeys(): {
        up: Phaser.Input.Keyboard.Key,
        down: Phaser.Input.Keyboard.Key,
        left: Phaser.Input.Keyboard.Key,
        right: Phaser.Input.Keyboard.Key,
    };

    readonly up: boolean;
    readonly down: boolean;
    readonly nokey: boolean;
}