export default FileChooser;

declare namespace FileChooser {

    interface IConfig {
        x?: number,
        y?: number,
        width?: number,
        height?: number,

        accept?: string,
        multiple?: boolean
    }

    namespace Events {
        type ValueChangeCallbackType = (fileChooser: FileChooser) => void;
    }
}

declare class FileChooser extends Phaser.GameObjects.DOMElement {
    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        config?: FileChooser.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        config?: FileChooser.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        config?: FileChooser.IConfig
    );

    syncTo(gameObject: Phaser.GameObjects.GameObject): this;

    readonly files: File[];

    setAccept(accept: string): this;

    setMultiple(multiple?: boolean): this;

    loadFile(
        file: File,
        loaderType: string,
        key: string,
        cacheType?: string
    ): this;

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