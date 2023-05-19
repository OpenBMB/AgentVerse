export default LoadBinaryAndImage;

declare namespace LoadBinaryAndImage {
    type OnLoadBinaryCallbackType = (buffer: Uint8Array) => Uint8Array
}

declare function LoadBinaryAndImage(
    scene: Phaser.Scene,
    key: string,
    url: string,
    imageType?: string,
    onLoadBinary?: LoadBinaryAndImage.OnLoadBinaryCallbackType
): void;

declare function LoadBinaryAndImage(
    scene: Phaser.Scene,
    key: string,
    url: string,
    onLoadBinary?: LoadBinaryAndImage.OnLoadBinaryCallbackType
): void;
