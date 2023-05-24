import WebFont from 'webfontloader';

export default WebFontLoaderCallback;

declare function WebFontLoaderCallback(
    this: Phaser.Loader.LoaderPlugin,
    config: WebFont.Config
): Phaser.Loader.LoaderPlugin;