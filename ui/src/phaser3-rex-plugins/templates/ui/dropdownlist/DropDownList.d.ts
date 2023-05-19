import Label from '../label/Label';

export default DropDownList;

declare namespace DropDownList {
    type CreateButtonCallbackType = (
        this: DropDownList,
        scene: Phaser.Scene,
        option: any,
        index: number,
        options: any[]
    ) => Phaser.GameObjects.GameObject;

    type CreateBackgroundCallbackType = (
        this: DropDownList,
        scene: Phaser.Scene,
    ) => Phaser.GameObjects.GameObject;

    type OnButtonClickCallbackType = (
        this: DropDownList,
        button: Phaser.GameObjects.GameObject,
        index: number,
        pointer: Phaser.Input.Pointer,
        event: Phaser.Types.Input.EventData
    ) => void;

    type OnButtonOverCallbackType = (
        this: DropDownList,
        button: Phaser.GameObjects.GameObject,
        index: number,
        pointer: Phaser.Input.Pointer,
        event: Phaser.Types.Input.EventData
    ) => void;

    type OnButtonOutCallbackType = (
        this: DropDownList,
        button: Phaser.GameObjects.GameObject,
        index: number,
        pointer: Phaser.Input.Pointer,
        event: Phaser.Types.Input.EventData
    ) => void;

    type AlignParentType = 'text' | 'icon';

    type ExpandDirectionType = 0 | 1 | 'down' | 'up';

    type SetValueCallbackType = (
        dropDownList: DropDownList,
        value?: any,
        previousValue?: any,
    ) => void;

    type ListSpaceType = {
        left?: number, right?: number, top?: number, bottom?: number, item?: number
    };

    type WrapListSpaceType = {
        left?: number, right?: number, top?: number, bottom?: number, item?: number, line?: number
    }

    interface IConfig extends Label.IConfig {
        options?: any[],
        list?: {
            createBackgroundCallback?: CreateBackgroundCallbackType;
            createButtonCallback?: CreateButtonCallbackType;

            onButtonClick?: OnButtonClickCallbackType;
            onButtonOver?: OnButtonOverCallbackType;
            onButtonOut?: OnButtonOutCallbackType;

            easeIn?: number;
            easeOut?: number;

            wrap?: boolean;
            width?: number;
            height?: number;
            alignParent?: AlignParentType;
            alignSide?: string;
            expandDirection?: ExpandDirectionType;
            bounds?: Phaser.Geom.Rectangle;

            space?: ListSpaceType | WrapListSpaceType;

            draggable?: boolean;
        },

        setValueCallback?: SetValueCallbackType;
        setValueCallbackScope?: object;
        value?: any;
    }
}

declare class DropDownList extends Label {
    constructor(
        scene: Phaser.Scene,
        config?: DropDownList.IConfig
    );

    setOptions(options: any[]): this;

    openListPanel(): this;
    closeListPanel(): this;
    toggleListPanel(): this;

    setValue(value?: any): this;
    value: any;

    setCreateButtonCallback(callback?: DropDownList.CreateBackgroundCallbackType): this;
    setCreateBackgroundCallback(callback?: DropDownList.CreateBackgroundCallbackType): this;

    setButtonClickCallback(callback?: DropDownList.OnButtonClickCallbackType): this;
    setButtonOverCallback(callback?: DropDownList.OnButtonOverCallbackType): this;
    setButtonOutCallback(callback?: DropDownList.OnButtonOutCallbackType): this;

    setListEaseInDuration(duration?: number): this;
    setListEaseOutDuration(duration?: number): this;

    setWrapEnable(enable?: boolean): this;
    setListWidth(width?: number): this;
    setListHeight(height?: number): this;
    setListSize(width?: number, height?: number): this;

    setListAlignmentMode(mode?: DropDownList.AlignParentType): this;
    setListAlignmentSide(side?: string): this;
    setListBounds(bounds: Phaser.Geom.Rectangle): this;

    setListSpace(space?: DropDownList.ListSpaceType | DropDownList.WrapListSpaceType): this;

    setListDraggable(enable?: boolean): this;
}