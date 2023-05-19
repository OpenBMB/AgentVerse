import Dialog from '../dialog/Dialog';
import { GeneralCreateGameObjectCallbackType } from '../utils/build/GeneralCreateGameObjectCallbackType';
import CreateBackground from '../utils/build/CreateBackground';
import SimpleLabel from '../simplelabel/SimpleLabel';
import CreateTextArea from '../utils/build/CreateTextArea';
import Label from '../label/Label';

export default ConfirmDialog;

declare namespace ConfirmDialog {
    type AlignTypes = number | 'left' | 'center' | 'right';

    interface IConfigClick {
        mode: 0 | 1 | 'pointerup' | 'pointerdown' | 'release' | 'press',
        clickInterval?: number
    }

    interface IConfig {
        x?: number,
        y?: number,
        width?: number,
        height?: number,

        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            title?: number,
            titleLeft?: number,
            titleRight?: number,

            content?: number,
            contentLeft?: number,
            contentRight?: number,

            actionsLeft?: number,
            actionsRight?: number,
            action?: number,

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
        };

        background?: CreateBackground.IConfig,

        title?: SimpleLabel.IConfig,

        content?: SimpleLabel.IConfig | CreateTextArea.IConfig,

        buttonMode?: 0 | 1 | 2;
        button?: SimpleLabel.IConfig,
        buttonA?: SimpleLabel.IConfig,
        buttonB?: SimpleLabel.IConfig,

        choicesType?: string,
        choice?: SimpleLabel.IConfig,
        choicesWidth?: number,
        choicesHeight?: number,

        proportion?: {
            title?: number,
            content?: number,
            actions?: number,
            choices?: number,
        },

        expand?: {
            title?: boolean,
            content?: boolean,
            actions?: boolean,
            choices?: boolean,
        },

        align?: {
            title?: AlignTypes,
            content?: AlignTypes,
            actions?: AlignTypes,
            choices?: AlignTypes,
        },

        click?: IConfigClick
    }

    interface IResetChoiceDisplayContentConfig extends Label.IResetDisplayContentConfig {
        value?: any;
    }

    interface IResetDisplayContentConfig {
        title?: string | Label.IResetDisplayContentConfig,

        content?: string | Label.IResetDisplayContentConfig,

        buttonA?: string | Label.IResetDisplayContentConfig,
        buttonB?: string | Label.IResetDisplayContentConfig,

        choices?: (string | IResetChoiceDisplayContentConfig)[]
    }

    interface ICreatorsConfig {
        background?: GeneralCreateGameObjectCallbackType,
        title?: SimpleLabel.ICreatorsConfig,
        content?: SimpleLabel.ICreatorsConfig | CreateTextArea.ICreatorsConfig,
        button?: SimpleLabel.ICreatorsConfig,
        buttonA?: SimpleLabel.ICreatorsConfig,
        buttonB?: SimpleLabel.ICreatorsConfig,
        choice?: SimpleLabel.ICreatorsConfig,
    }
}

declare class ConfirmDialog extends Dialog {
    constructor(
        scene: Phaser.Scene,
        config?: ConfirmDialog.IConfig,
        creators?: ConfirmDialog.ICreatorsConfig
    );

    resetDisplayContent(
        config?: ConfirmDialog.IResetDisplayContentConfig
    ): this;
}