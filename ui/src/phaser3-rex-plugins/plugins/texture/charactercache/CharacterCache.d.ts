import EventEmitter from "../../utils/eventemitter/EventEmitter";

export default CharacterCache;

declare namespace CharacterCache {
    interface IConfig {
        key: string,
        cellWidth: number,
        cellHeight: number,
        maxCharacterCount?: number,
        freqMode?: boolean,

        textObject?: Phaser.GameObjects.GameObject,

        content?: string,

        eventEmitter?: EventEmitter | false,
    }

    interface CacheData {
        character: string,
        freq: number,
        alive: boolean,
        lock: boolean,
    }
}

declare class CharacterCache extends EventEmitter {
    constructor(
        scene: Phaser.Scene,
        config: CharacterCache.IConfig
    );

    readonly key: string;
    readonly cellWidth: number;
    readonly cellHeight: number;
    readonly inCacheCount: number;

    destroy(): void;

    bindTextObject(
        textObject: Phaser.GameObjects.GameObject
    ): this;

    overrideBitmapText(
        bitmapText: Phaser.GameObjects.GameObject
    ): Phaser.GameObjects.GameObject;

    load(
        content: string,
        lock?: boolean
    ): this;

    unlock(): this;

    getAllData(
    ): CharacterCache.CacheData[];

    clear(): this;

}