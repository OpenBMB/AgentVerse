export default Open;

declare namespace Open {

    interface IConfig {
        accept?: string,
        multiple?: boolean
        closeDelay?: number
    }

    interface IResult {
        files: File[]
    }
}

declare function Open(
    game: Phaser.Game | Phaser.Scene | Phaser.GameObjects.GameObject,
    config?: Open.IConfig
): Promise<Open.IResult>;