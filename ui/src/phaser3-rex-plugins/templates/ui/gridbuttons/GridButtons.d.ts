// import * as Phaser from 'phaser';
import GridSizer from '../gridsizer/GridSizer';
import { IConfig as IConfigButtons } from '../utils/buttongroup/Buttons';


export default GridButtons;

declare namespace GridButtons {
    type CreateCellContainerCallbackType = (
        scene: Phaser.Scene,
        x: number, y: number,
        config: {
            column?: number, row?: number,

            align?: GridSizer.AlignTypes,
            padding?: GridSizer.PaddingTypes,
            expand?: boolean,
            key?: string
        }
    ) => Phaser.GameObjects.GameObject;

    interface IConfig extends GridSizer.IConfig, IConfigButtons {
        background?: Phaser.GameObjects.GameObject,

        buttons?: Phaser.GameObjects.GameObject[][],
        createCellContainerCallback?: CreateCellContainerCallbackType
    }
}

declare class GridButtons extends GridSizer {
    constructor(
        scene: Phaser.Scene,
        config?: GridButtons.IConfig
    );

    emitButtonClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    setButtonEnable(
        index?: number | Phaser.GameObjects.GameObject | boolean,
        enable?: boolean
    ): this;

    toggleButtonEnable(
        index?: number | Phaser.GameObjects.GameObject
    ): this;

    getButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;

    getButton(
        index: number
    ): Phaser.GameObjects.GameObject | null;

    addButton(
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    removeButton(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    clearButtons(
        destroyChild?: boolean
    ): this;

    showButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    hideButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    forEachButtton(
        callback: (button: Phaser.GameObjects.GameObject, index: number, buttons: Phaser.GameObjects.GameObject[]) => void,
        scop?: unknown
    ): this;

    readonly buttons: Phaser.GameObjects.GameObject[];

    value: unknown;

    setSelectedButtonName(
        name: string
    ): this;

    getSelectedButtonName(): string;

    setButtonState(
        name: string,
        state?: boolean
    ): this;

    getButtonState(
        name: string
    ): boolean;
}