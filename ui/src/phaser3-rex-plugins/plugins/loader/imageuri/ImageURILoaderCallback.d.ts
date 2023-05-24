export default ImageURILoaderCallback;

declare function ImageURILoaderCallback(
    this: Phaser.Loader.LoaderPlugin,
    key: string,
    uri: string,
    frameConfig?: Phaser.Types.Loader.FileTypes.ImageFrameConfig
): Phaser.Loader.LoaderPlugin;