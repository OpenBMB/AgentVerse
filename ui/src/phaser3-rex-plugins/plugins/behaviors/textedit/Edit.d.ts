import TextEdit from './TextEdit';

export default function Edit(
    textObject: Phaser.GameObjects.GameObject,
    config?: TextEdit.IConfigOpen,
    onCloseCallback?: (textObject: Phaser.GameObjects.GameObject) => void
): TextEdit;