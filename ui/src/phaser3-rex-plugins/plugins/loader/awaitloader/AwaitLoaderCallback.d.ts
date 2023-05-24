export default AwaitLoaderCallback;

declare namespace AwaitLoaderCallback {
    type RunTaskCallbackType = (
        successCallback: Function,
        failureCallback: Function
    ) => Promise<void> | void;
}

declare function AwaitLoaderCallback(
    this: Phaser.Loader.LoaderPlugin,
    callback: AwaitLoaderCallback.RunTaskCallbackType,
    scope?: object
): Phaser.Loader.LoaderPlugin;

declare function AwaitLoaderCallback(
    this: Phaser.Loader.LoaderPlugin,
    key: string,
    config: {
        callback: AwaitLoaderCallback.RunTaskCallbackType,
        scope?: object
    }
): Phaser.Loader.LoaderPlugin;
