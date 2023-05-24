export default ScriptTagLoaderCallback;

declare function ScriptTagLoaderCallback(
    this: Phaser.Loader.LoaderPlugin,
    url: string,
    availableTest?: () => boolean
): Phaser.Loader.LoaderPlugin;

declare function ScriptTagLoaderCallback(
    this: Phaser.Loader.LoaderPlugin,
    config: {
        url: string
        availableTest?: () => boolean
    }
): Phaser.Loader.LoaderPlugin;