import StateManagerBase from './StateManagerBase';

export default StateManager;

declare namespace StateManager {
    interface IState extends StateManagerBase.IState {
        update?: Function,
        preupdate?: Function,
        postupdate?: Function,
    }

    interface IConfig extends StateManagerBase.IConfig {
        scene?: Phaser.Scene;
    }
}

declare class StateManager extends StateManagerBase {
    constructor(config?: StateManager.IConfig);

    addState(
        name: string,
        state: StateManager.IState
    ): this;
    addState(
        state: StateManager.IState
    ): this;

    addStates(
        state: StateManager.IState[]
    ): this;
    addStates(
        states: { [name: string]: StateManager.IState },
    ): this;

    readonly _scene: Phaser.Scene;
    getScene(): Phaser.Scene;

    update(
        time: number,
        delta: number
    ): void;

    preupdate(
        time: number,
        delta: number
    ): void;

    postupdate(
        time: number,
        delta: number
    ): void;

    startUpdate(
        scene?: Phaser.Scene
    ): this;
    stopUpdate(): this;

    startPreUpdate(
        scene?: Phaser.Scene
    ): this;
    stopPreUpdate(): this;

    startPostUpdate(
        scene?: Phaser.Scene
    ): this;
    stopPostUpdate(): this;
}