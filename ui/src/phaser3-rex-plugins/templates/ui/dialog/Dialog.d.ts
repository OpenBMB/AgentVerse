// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';
import { ModalBehavoir } from '../modal/Modal';

export default Dialog;

declare namespace Dialog {

    type AlignTypes = number | 'left' | 'center' | 'right';

    interface IConfigClick {
        mode: 0 | 1 | 'pointerup' | 'pointerdown' | 'release' | 'press',
        clickInterval?: number
    }

    interface IConfig extends Sizer.IConfig {
        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            title?: number,
            titleLeft?: number,
            titleRight?: number,

            content?: number,
            contentLeft?: number,
            contentRight?: number,

            description?: number,
            descriptionLeft?: number,
            descriptionRight?: number,

            choices?: number,
            choicesLeft?: number,
            choicesRight?: number,

            choice?: number,
            choiceLine?: number,
            choiceColumn?: number, choiceRow?: number,
            choicesBackgroundLeft?: number,
            choicesBackgroundRight?: number,
            choicesBackgroundTop?: number,
            choicesBackgroundBottom?: number,

            actionsLeft?: number,
            actionsRight?: number,

            action?: number,

            toolbarItem?: number,
            leftToolbarItem?: number,

        };

        background?: Phaser.GameObjects.GameObject,

        title?: Phaser.GameObjects.GameObject,

        toolbar?: Phaser.GameObjects.GameObject[],

        toolbarBackground?: Phaser.GameObjects.GameObject,

        leftToolbar?: Phaser.GameObjects.GameObject[],

        leftToolbarBackground?: Phaser.GameObjects.GameObject,

        content?: Phaser.GameObjects.GameObject,

        description?: Phaser.GameObjects.GameObject,

        choicesType?: string,
        choicesWidth?: number,
        choicesHeight?: number,
        choices?: Phaser.GameObjects.GameObject[],
        choicesBackground?: Phaser.GameObjects.GameObject,

        actions?: Phaser.GameObjects.GameObject[],
        actionsBackground?: Phaser.GameObjects.GameObject,

        proportion?: {
            title?: number,
            content?: number,
            description?: number,
            choices?: number,
            actions?: number,
        },

        expand?: {
            title?: boolean,
            content?: boolean,
            description?: boolean,
            choices?: boolean,
            actions?: boolean,
        },

        align?: {
            title?: AlignTypes,
            content?: AlignTypes,
            description?: AlignTypes,
            choices?: AlignTypes,
            actions?: AlignTypes,
        },

        click?: IConfigClick
    }

    interface IModalConfig extends ModalBehavoir.IConfig {
        defaultBehavior?: boolean,
    }

    type CloseEventDataType = {
        index: number,
        text: string,
        button: Phaser.GameObjects.GameObject,
        dialog: Dialog,
        value: any
    }

    type OnModalCloseCallbackType = (data: CloseEventDataType | Dialog) => void;
}

declare class Dialog extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: Dialog.IConfig
    );

    emitChoiceClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    emitActionClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    emitToolbarClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    emitLeftToolbarClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    setChoiceEnable(
        index: number | Phaser.GameObjects.GameObject,
        enable?: boolean
    ): this;

    setActionEnable(
        index: number | Phaser.GameObjects.GameObject,
        enable?: boolean
    ): this;

    setToolbarEnable(
        index: number | Phaser.GameObjects.GameObject,
        enable?: boolean
    ): this;

    setLeftToolbarEnable(
        index: number | Phaser.GameObjects.GameObject,
        enable?: boolean
    ): this;

    toggleChoiceEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    toggleActionEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    toggleToolbarEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    toggleLeftToolbarEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    getChoiceEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;

    getActionEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;

    getToolbarEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;

    getLeftToolbarEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;

    addChoice(gameObject: Phaser.GameObjects.GameObject): this;

    addAction(gameObject: Phaser.GameObjects.GameObject): this;

    addToolbar(gameObject: Phaser.GameObjects.GameObject): this;

    addLeftToolbar(gameObject: Phaser.GameObjects.GameObject): this;

    removeChoice(
        index: number | Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    removeAction(
        index: number | Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    removeToolbar(
        index: number | Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    removeLeftToolbar(
        index: number | Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    clearChoices(destroyChild?: boolean): this;

    clearActions(destroyChild?: boolean): this;

    clearToolbar(destroyChild?: boolean): this;

    clearLeftToolbar(destroyChild?: boolean): this;

    showChoice(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    showAction(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    showToolbar(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    showLeftToolbar(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    hideChoice(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    hideAction(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    hideToolbar(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    hideLeftToolbar(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    forEachChoice(
        callback: (button: Phaser.GameObjects.GameObject, index: number, buttons: Phaser.GameObjects.GameObject[]) => void,
        scop?: unknown
    ): this;

    forEachAction(
        callback: (button: Phaser.GameObjects.GameObject, index: number, buttons: Phaser.GameObjects.GameObject[]) => void,
        scop?: unknown
    ): this;

    forEachToolbar(
        callback: (button: Phaser.GameObjects.GameObject, index: number, buttons: Phaser.GameObjects.GameObject[]) => void,
        scop?: unknown
    ): this;

    forEachLeftToolbar(
        callback: (button: Phaser.GameObjects.GameObject, index: number, buttons: Phaser.GameObjects.GameObject[]) => void,
        scop?: unknown
    ): this;

    setAllButtonsEnable(enable?: boolean): this;

    getChoicesButtonState(name: string): boolean;
    getChoicesButtonState(): { [name: string]: boolean };

    getChoicessButtonStates(): { [name: string]: boolean };

    setChoicesButtonState(name: string, state?: boolean): this;

    clearChoicesButtonStates(): this;

    getChoicesSelectButtonName(): string;

    modal(
        config?: Dialog.IModalConfig,
        onClose?: Dialog.OnModalCloseCallbackType
    ): this;

    modal(
        onClose?: Dialog.OnModalCloseCallbackType
    ): this;

    modalPromise(
        config?: Dialog.IModalConfig,
    ): Promise<Dialog.CloseEventDataType | Dialog>;

    modalClose(closeEventData?: Dialog.CloseEventDataType): this;
}