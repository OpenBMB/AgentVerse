import { EaseMove, EaseMoveTo, EaseMoveToDestroy, EaseMoveFrom, EaseMoveFromDestroy } from './easemove';

export default class ScalePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: EaseMove.IConfig
    ): EaseMove;

    moveTo: typeof EaseMoveTo;
    moveFrom: typeof EaseMoveFrom;
    moveToDestroy: typeof EaseMoveToDestroy;
    moveFromDestroy: typeof EaseMoveFromDestroy;
}