// import * as Phaser from 'phaser';
import GridSizer from '../gridsizer/GridSizer';


export default Tabs;

declare namespace Tabs {

    interface IConfig extends GridSizer.IConfig {
        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            leftButtonsOffset?: number,
            rightButtonsOffset?: number,
            topButtonsOffset?: number,
            bottomButtonsOffset?: number,

            leftButton?: number,
            rightButton?: number,
            topButton?: number,
            bottomButton?: number,
        },

        background?: Phaser.GameObjects.GameObject,
        panel?: Phaser.GameObjects.GameObject,

        leftButtons?: Phaser.GameObjects.GameObject[],
        leftButtonsBackground?: Phaser.GameObjects.GameObject,

        rightButtons?: Phaser.GameObjects.GameObject[],
        rightButtonsBackground?: Phaser.GameObjects.GameObject,

        topButtons?: Phaser.GameObjects.GameObject[],
        topButtonsBackground?: Phaser.GameObjects.GameObject,

        bottomButtons?: Phaser.GameObjects.GameObject[],
        bottomButtonsBackground?: Phaser.GameObjects.GameObject,

        click?: {
            mode: 0 | 1 | 'pointerup' | 'pointerdown' | 'release' | 'press',
            clickInterval?: number
        },
    }

}

declare class Tabs extends GridSizer {
    constructor(
        scene: Phaser.Scene,
        config?: Tabs.IConfig
    );

    emitButtonClick(
        groupName: 'left' | 'right' | 'top' | 'bottom',
        index: number | Phaser.GameObjects.GameObject
    ): this;
    emitLeftButtonClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    emitRightButtonClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    emitTopButtonClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    emitBottomButtonClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    setButtonEnable(
        groupName: 'left' | 'right' | 'top' | 'bottom',
        index?: number | Phaser.GameObjects.GameObject | boolean,
        enable?: boolean
    ): this;
    setLeftButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    setRightButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    setTopButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    setBottomButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    toggleButtonEnable(
        groupName: 'left' | 'right' | 'top' | 'bottom',
        index?: number | Phaser.GameObjects.GameObject
    ): this;
    toggleLeftButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    toggleRightButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    toggleTopButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    toggleBottomButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    getButtonEnable(
        groupName: 'left' | 'right' | 'top' | 'bottom',
        index: number | Phaser.GameObjects.GameObject
    ): boolean;
    getLeftButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;
    getRightButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;
    getTopButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;
    getBottomButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;

    getButtone(
        groupName: 'left' | 'right' | 'top' | 'bottom',
        index: number
    ): Phaser.GameObjects.GameObject | null;
    getLeftButton(
        index: number
    ): Phaser.GameObjects.GameObject | null;
    getRightButton(
        index: number
    ): Phaser.GameObjects.GameObject | null;
    getTopButton(
        index: number
    ): Phaser.GameObjects.GameObject | null;
    getBottomButton(
        index: number
    ): Phaser.GameObjects.GameObject | null;

    addButton(
        groupName: 'left' | 'right' | 'top' | 'bottom',
        gameObject: Phaser.GameObjects.GameObject
    ): this;
    addLeftButton(
        gameObject: Phaser.GameObjects.GameObject
    ): this;
    addRightButton(
        gameObject: Phaser.GameObjects.GameObject
    ): this;
    addTopButton(
        gameObject: Phaser.GameObjects.GameObject
    ): this;
    addBottomButton(
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    removeButton(
        groupName: 'left' | 'right' | 'top' | 'bottom',
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;
    removeLeftButton(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;
    removeRightButton(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;
    removeTopButton(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;
    removeBottomButton(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    clearButtons(
        groupName: 'left' | 'right' | 'top' | 'bottom',
        destroyChild?: boolean
    ): this;
    clearLeftButtons(
        destroyChild?: boolean
    ): this;
    clearRightButtons(
        destroyChild?: boolean
    ): this;
    clearTopButtons(
        destroyChild?: boolean
    ): this;
    clearBottomButtosn(
        destroyChild?: boolean
    ): this;

    showButton(
        groupName: 'left' | 'right' | 'top' | 'bottom',
        index: number | Phaser.GameObjects.GameObject
    ): this;
    showLeftButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    showRightButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    showTopButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    showBottomButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    hideButton(
        groupName: 'left' | 'right' | 'top' | 'bottom',
        index: number | Phaser.GameObjects.GameObject
    ): this;
    hideLeftButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    hideRightButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    hideTopButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    hideBottomButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    forEachButtton(
        groupName: 'left' | 'right' | 'top' | 'bottom',
        callback: (button: Phaser.GameObjects.GameObject, index: number, buttons: Phaser.GameObjects.GameObject[]) => void,
        scop?: unknown
    ): this;
    forEachLeftButton(
        callback: (button: Phaser.GameObjects.GameObject, index: number, buttons: Phaser.GameObjects.GameObject[]) => void,
        scop?: unknown
    ): this;
    forEachRightButton(
        callback: (button: Phaser.GameObjects.GameObject, index: number, buttons: Phaser.GameObjects.GameObject[]) => void,
        scop?: unknown
    ): this;
    forEachTopButton(
        callback: (button: Phaser.GameObjects.GameObject, index: number, buttons: Phaser.GameObjects.GameObject[]) => void,
        scop?: unknown
    ): this;
    forEachBottomButton(
        callback: (button: Phaser.GameObjects.GameObject, index: number, buttons: Phaser.GameObjects.GameObject[]) => void,
        scop?: unknown
    ): this;
}