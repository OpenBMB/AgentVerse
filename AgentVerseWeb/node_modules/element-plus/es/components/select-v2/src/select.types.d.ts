export declare type OptionCommon = {
    label: string;
};
export declare type Option<T = any> = OptionCommon & {
    created?: boolean;
    value: T;
    [prop: string]: any;
};
export declare type OptionGroup<T = any> = OptionCommon & {
    options: Array<T>;
    [prop: string]: any;
};
export declare type OptionType<T = any> = Option<T> | OptionGroup<T>;
export declare type OptionItemProps = {
    item: any;
    index: number;
    disabled: boolean;
};
