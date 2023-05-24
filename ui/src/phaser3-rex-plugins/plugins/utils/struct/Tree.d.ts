export default Tree;

declare namespace Tree {
    type DataType = { [name: string]: any };
}
declare class Tree {
    constructor(data?: Tree.DataType);

    getFullPath(keys?: string): string;
    getFullPath(keys?: string[]): string[];

    setRefPath(keys?: string): this;

    setValue(keys: string, value: any): this;
    setValue(data: Tree.DataType): this;
    setValue(): this;

    getValue(keys?: string | string[]): any;

    cloneValue(keys?: string | string[]): Tree.DataType;

    removeKey(keys?: string | string[]): this;

    hasKey(keys?: string | string[]): boolean;

    clear(): this;

    clone(cloneData?: boolean): Tree;

}