import Managers from '../Managers';

export default WaitEventManager;

declare namespace WaitEventManager {
    interface IConfig {
        completeEventName?: string,
        clickTarget?: Phaser.Events.EventEmitter,
        camera?: Phaser.Cameras.Scene2D.Camera
    }

    interface IWaitAnyConfig {
        time?: number,
        click?: boolean,
        key?: string | boolean,
        camera?: string,
        bgm?: boolean,
        bgm2?: boolean,
        se?: boolean,
        se2?: boolean,

        // GameObject tween
    }
}

declare class WaitEventManager {
    constructor(
        parent: Managers,
        config?: WaitEventManager.IConfig,
    );

    waitEvent(
        eventEmitter: Phaser.Events.EventEmitter,
        eventName: string,
        completeNextTick?: boolean
    ): Managers


    waitTime(duration: number): Managers;
    waitClick(): Managers;
    waitKeyDown(key?: string): Managers;
    waitGameObjectTweenComplete(
        goType: string | undefined, name: string,
        property: string
    ): Managers;
    waitBackgroundMusicComplete(): Managers;
    waitBackgroundMusic2Complete(): Managers;
    waitSoundEffectComplete(): Managers;
    waitSoundEffect2Complete(): Managers;
    waitCameraEffectComplete(effectName: string): Managers;
    waitAny(config?: { [name: string]: any }): Managers;
}