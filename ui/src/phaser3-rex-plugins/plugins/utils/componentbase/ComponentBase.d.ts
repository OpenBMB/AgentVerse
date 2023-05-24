export default ComponentBase;

declare namespace ComponentBase {
    interface IConfig {
        eventEmitter?: Phaser.Events.EventEmitter | boolean;
    }
}

declare class ComponentBase extends Phaser.Events.EventEmitter {
    constructor(
        parent?: Object,
        config?: ComponentBase.IConfig
    );

    setParent(
        parent?: Object
    ): this;
    parent: Object;
    scene: Phaser.Scene;
    game: Phaser.Game;

    destroy(): void;
}