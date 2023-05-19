// import * as Phaser from 'phaser';
import Scrollable from '../utils/scrollable/Scrollable';


export default ScrollablePanel;

declare namespace ScrollablePanel {

    interface IConfig extends Scrollable.IConfig {
        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            panel?: number | {
                left?: number, right?: number, top?: number, bottom?: number,
            },

            header?: number,
            footer?: number,
        },

        panel: {
            child: Phaser.GameObjects.GameObject,
            mask?: (
                {
                    padding?: number,
                    updateMode?: 0 | 1 | 'update' | 'everyTick'
                } |
                boolean
            ),
        },
    }
}

declare class ScrollablePanel extends Scrollable {
    constructor(
        scene: Phaser.Scene,
        config?: ScrollablePanel.IConfig
    );

}