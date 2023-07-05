import BBCodeText from '../../bbcodetext/BBCodeText';

export default CreateText;

declare namespace CreateText {
    interface IBitmapTextConfig {
        $type?: 'bitmaptext',
        key: string,
        size?: number, fontSize?: number,
        color?: number,
    }

    interface ITextConfig extends Phaser.GameObjects.TextStyle {
        $type?: 'text',
    }

    interface IBBCodeTextConfig extends BBCodeText.TextStyle {
        $type?: 'bbcodetext',
    }

    type IConfig = IBitmapTextConfig | ITextConfig | IBBCodeTextConfig;

}

declare function CreateText(
    scene: Phaser.Scene,
    config?: CreateText.IConfig
): Phaser.GameObjects.Text;