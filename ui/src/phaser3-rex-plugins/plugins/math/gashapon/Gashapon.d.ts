export default Gashapon;

declare namespace Gashapon {

    type ModeType = 0 | 1 | 'shuffle' | 'random';

    type ItemsType = { [name: string]: number };

    type ForEachItemCallbackType = (name: string, count: number) => void;

    interface IConfig {
        mode?: ModeType,
        items?: ItemsType,
        reload?: boolean,
        rnd?: Phaser.Math.RandomDataGenerator,
    }

    interface IState {
        mode: ModeType,
        items: ItemsType,
        reload: boolean,
        rnd: Phaser.Math.RandomDataGenerator,

        remainder: ItemsType,
        result: string,
        restart: boolean
    }
}

declare class Gashapon {
    constructor(
        config?: Gashapon.IConfig
    );

    constructor(
        config?: Gashapon.IState
    );

    destroy(): void;

    next(
        name?: string
    ): string | null;

    readonly result: string;

    setItem(name: string, count: number): this;

    addItem(name: string, count: number): this;

    putItemBack(name: string, count: number): this;

    removeItem(name: string): this;

    removeAllItems(): this;

    toJSON(

    ): Gashapon.IState;

    resetFromJSON(
        state: Gashapon.IState
    ): this;

    getItems(): Gashapon.ItemsType;

    getRemain(): Gashapon.ItemsType;

    forEachItem(
        callback: Gashapon.ForEachItemCallbackType,
        scope?: object,
    ): this;

    forEachRemain(
        callback: Gashapon.ForEachItemCallbackType,
        scope?: object,
    ): this;

    getItemCount(name: string): number;

    getRemainCount(name: string): number;

    setRND(
        rnd?: Phaser.Math.RandomDataGenerator | null
    ): this;

}