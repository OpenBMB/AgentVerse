import BBCodeText from '../../bbcodetext/BBCodeText';

export default CreateBBCodeText;

declare namespace CreateBBCodeText {
    interface IConfig extends BBCodeText.TextStyle {

    }
}

declare function CreateBBCodeText(
    scene: Phaser.Scene,
    config?: CreateBBCodeText.IConfig
): BBCodeText;