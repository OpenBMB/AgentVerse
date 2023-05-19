// import * as Phaser from 'phaser';
import Buttons from '../buttons/Buttons';


export default Menu;

declare namespace Menu {

    type EaseConfigTypes = number |
    {
        duration?: number,
        orientation?: 0 | 1 | 'x' | 'y' | 'h' | 'v',
        ease?: string
    }

    type ExpandEventTypes = 'button.click' | 'button.over';

    type SubMenuSideTypes = 0 | 1 | 2 | 3 | 'right' | 'down' | 'left' | 'up';

    interface IConfig extends Buttons.IConfig {
        items: any[],

        createBackgroundCallback?: (items: any[]) => Phaser.GameObjects.GameObject,

        createBackgroundCallbackScope?: object,

        createButtonCallback?: (item: any, index: number, items: any[]) => Phaser.GameObjects.GameObject,

        createButtonCallbackScope?: object,

        easeIn?: EaseConfigTypes,
        easeOut?: EaseConfigTypes,

        expandEvent?: ExpandEventTypes,

        subMenuSide?: SubMenuSideTypes,
    }
}

declare class Menu extends Buttons {
    constructor(
        scene: Phaser.Scene,
        config?: Menu.IConfig
    );

    collapse(): this;

    collapseSubMenu(): this;
}