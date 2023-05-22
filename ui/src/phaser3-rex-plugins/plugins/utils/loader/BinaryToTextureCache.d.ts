export default BinaryToTextureCache;

declare function BinaryToTextureCache(
    scene: Phaser.Scene,
    buffer: Uint8Array | string,
    textureKey: string,
    imageType?: string
): void;