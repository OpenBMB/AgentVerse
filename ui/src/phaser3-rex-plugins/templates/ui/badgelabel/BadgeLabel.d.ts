// import * as Phaser from 'phaser';
import OverlapSizer from '../overlapsizer/OverlapSizer';

export default BadgeLabel;

declare namespace BadgeLabel {

    interface IConfig extends OverlapSizer.IConfig {
        background?: Phaser.GameObjects.GameObject,
        main?: Phaser.GameObjects.GameObject,

        leftTop?: Phaser.GameObjects.GameObject,
        centerTop?: Phaser.GameObjects.GameObject,
        rightTop?: Phaser.GameObjects.GameObject,
        leftCenter?: Phaser.GameObjects.GameObject,
        center?: Phaser.GameObjects.GameObject,
        rightCenter?: Phaser.GameObjects.GameObject,
        leftBottom?: Phaser.GameObjects.GameObject,
        centerBottom?: Phaser.GameObjects.GameObject,
        rightBottom?: Phaser.GameObjects.GameObject,
    }
}

declare class BadgeLabel extends OverlapSizer {

    constructor(
        scene: Phaser.Scene,
        config?: BadgeLabel.IConfig
    );
}