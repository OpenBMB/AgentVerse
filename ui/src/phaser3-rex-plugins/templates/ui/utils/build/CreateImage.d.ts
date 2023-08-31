export default CreateImage;

declare namespace CreateImage {
    interface IConfig {

    }
}

declare function CreateImage(
    scene: Phaser.Scene,
    config?: CreateImage.IConfig,
): Phaser.GameObjects.Image