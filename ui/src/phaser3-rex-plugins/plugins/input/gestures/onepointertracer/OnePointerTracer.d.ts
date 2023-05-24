// import * as Phaser from 'phaser';


export default OnePointerTracer;

declare namespace OnePointerTracer {

    interface IConfig {
        enable?: boolean,
        bounds?: Phaser.Geom.Rectangle,
        eventEmitter?: boolean | Phaser.Events.EventEmitter,
    }

}

declare class OnePointerTracer extends Phaser.Events.EventEmitter {

    enable: boolean;
    setEnable(enable?: boolean): this;
    toggleEnable(): this;

    bounds: Phaser.Geom.Rectangle | undefined;
    setDetectBounds(bounds?: Phaser.Geom.Rectangle): this;

    pointer: Phaser.Input.Pointer | undefined;
    lastPointer: Phaser.Input.Pointer | undefined;
}