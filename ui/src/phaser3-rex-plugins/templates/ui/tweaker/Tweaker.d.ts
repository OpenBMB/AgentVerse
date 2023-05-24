import Sizer from '../sizer/Sizer';
import RoundRectangle from '../roundrectangle/RoundRectangle';
import CreateBackground from '../utils/build/CreateBackground';
import SimpleLabel from '../simplelabel/SimpleLabel';
import Buttons from '../buttons/Buttons';
import FixWidthButtons from '../fixwidthbuttons/FixWidthButtons';
import Pages from '../pages/Pages';
import InputText from '../canvasinput/CanvasInput';
import Checkbox from '../checkbox/Checkbox';
import ToggleSwitch from '../toggleswitch/ToggleSwitch';
import ColorInput from '../colorinput/colorinput/ColorInput';

export default Tweaker;

declare namespace Tweaker {
    interface IInteractiveRoundRectangleConfig extends RoundRectangle.IConfig {
        'active.color'?: number,
        'active.alpha'?: number,

        'active.strokeColor'?: number,
        'active.strokeAlpha'?: number,
        'active.strokeWidth'?: number,
    }

    interface IInteractiveLabelConfig extends SimpleLabel.IConfig {
        background?: IInteractiveRoundRectangleConfig,
    }

    interface IButtonConfig extends IInteractiveLabelConfig {
        expand?: boolean,
    }

    interface IFolderTitleConfig extends SimpleLabel.IConfig {
        expandedIcon?: {
            color?: number,
            alpha?: number,

            strokeColor?: number,
            strokeAlpha?: number,
            strokeWidth?: number,
            arrowOnly?: boolean,

            easeDuration?: number,
        }
    }


    interface IConfig extends Sizer.IConfig {
        styles: {
            itemWidth?: number,

            background?: CreateBackground.IConfig,

            inputRow?: {
                background?: CreateBackground.IConfig,

                title?: SimpleLabel.IConfig,

                inputText?: InputText.IConfig,

                slider?: {
                    track: RoundRectangle.IConfig,
                    indicator: RoundRectangle.IConfig,
                    thumb: RoundRectangle.IConfig,
                },

                list?: {
                    label?: SimpleLabel.IConfig,

                    button?: IInteractiveLabelConfig,
                },

                button?: IButtonConfig,

                checkbox?: Checkbox.IConfig,

                toggleSwitch?: ToggleSwitch.IConfig,

                colorInput?: ColorInput.IConfig,

                proportion?: {
                    title?: number,
                    inputField?: number,
                    range?: {
                        slider?: number,
                        inputText?: number,
                    }
                }
            },

            folder?: {
                title?: SimpleLabel.IConfig,

                background?: CreateBackground.IConfig,

                space?: {
                    left?: number, right?: number, top?: number, bottom?: number,
                    item?: number
                },
            },

            tab?: {
                tab?: IInteractiveLabelConfig,

                wrapTabs?: boolean,
                tabs?: Buttons.IConfig | FixWidthButtons.IConfig,
                pages?: Pages.IConfig,
            },

            separator?: RoundRectangle.IConfig,

            space?: {
                left?: number, right?: number, top?: number, bottom?: number,
                item?: number
            }
        }
    }

    interface IAddInputConfig {
        bindingTarget?: Object,
        bindingKey?: string,
        autoUpdate?: boolean,

        view?: 'string' | 'number' | 'range' | 'list' | 'buttons' | 'boolean' | 'color',

        icon?: string,
        iconFrame?: string,
        iconSize?: number,

        title?: string,

        min?: number, max?: number,

        options?: {
            text: string,
            value: any
        }[],

        format: (value?: any) => string,

        inputTextReadOnly?: boolean,

        monitor?: boolean,

        key?: string,

        onValidate?: (
            newValue: any, oldValue: any,
            bindingTarget: Object, bindingKey: string
        ) => boolean;

        onValueChange?: (
            newValue: any, oldValue: any,
            bindingTarget: Object, bindingKey: string
        ) => void,
    }

    interface IAddButtonConfig {
        bindingTarget?: Object,

        icon?: string,
        iconFrame?: string,
        iconSize?: number,

        title: string,

        label: string,

        callback: (bindingTarget: Object) => void,

        key?: string,
    }

    interface IAddTabConfig {
        pages: {
            title: string,
            show?: boolean,

            key?: string,
        }[]
    }

    interface IAddFolderConfig {
        title: string,
        expanded?: boolean,

        key?: string,
    }
}

declare class Tweaker extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: Tweaker.IConfig
    );

    addInput(
        object: Object,
        key: string,
        config?: Tweaker.IAddInputConfig
    ): this;


    addInput(
        config?: Tweaker.IAddInputConfig
    ): this;

    addButton(
        config: Tweaker.IAddButtonConfig
    ): this;

    addSeparator(): this;

    addFolder(
        config: Tweaker.IAddFolderConfig
    ): Tweaker;

    addTab(
        config: Tweaker.IAddTabConfig
    ): Tweaker[];

    setBindingTarget(
        object: Object
    ): this;
}