import Label from '../label/Label';

export default FileSelectorButton;

declare namespace FileSelectorButton {
    interface IConfig extends Label.IConfig {
        accept?: string,
        multiple?: boolean,
    }
}

declare class FileSelectorButton extends Label {
    constructor(
        scene: Phaser.Scene,
        config?: FileSelectorButton.IConfig
    );

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