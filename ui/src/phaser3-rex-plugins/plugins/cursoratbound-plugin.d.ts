import CursorAtBound from './cursoratbound';

export default class CursorAtBoundPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: CursorAtBound.IConfig
    ): CursorAtBound;

}