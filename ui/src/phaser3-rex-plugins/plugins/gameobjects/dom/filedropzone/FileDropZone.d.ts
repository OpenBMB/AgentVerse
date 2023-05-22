export default FileDropZone;

declare namespace FileDropZone {

    type FilterCallbackType = (
        file: File,
        files: File[]
    ) => boolean;

    type FiltersType = { [filterType: string]: FilterCallbackType }

    interface IConfig {
        x?: number,
        y?: number,
        width?: number,
        height?: number,

        filters?: FiltersType

    }
}

declare class FileDropZone extends Phaser.GameObjects.DOMElement {
    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        config?: FileDropZone.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        config?: FileDropZone.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        config?: FileDropZone.IConfig
    );

    setDropEnable(enable?: boolean): this;
    toggleDropEnable(): this;
    dropEnable: boolean;

    addFilter(
        name: string,
        callback: FileDropZone.FilterCallbackType
    ): this;
    addFilters(filters: FileDropZone.FiltersType): this;

    syncTo(gameObject: Phaser.GameObjects.GameObject): this;

    readonly files: File[];

    loadFile(
        file: File,
        loaderType: string,
        key: string,
        cacheType?: string,
        onComplete?: (data: any) => void
    ): this;

    loadFilePromise(
        file: File,
        loaderType: string,
        key: string,
        cacheType?: string
    ): Promise<any>;
}