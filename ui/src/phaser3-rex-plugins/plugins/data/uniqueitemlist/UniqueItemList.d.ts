export default UniqueItemList;

declare namespace UniqueItemList {
    interface IConfig {
        items?: any[],
        autoCleanup?: boolean,
    }
}

declare class UniqueItemList<ItemType = any> {
    constructor(
        config?: UniqueItemList.IConfig
    );

    constructor(
        items?: any[]
    );

    getFirst(): ItemType;

    getLast(): ItemType;

    get(index: number): ItemType;

    getRandom(): ItemType;

    getItems(): ItemType[];

    cloneItems(): ItemType[];

    readonly length: number;

    isEmpty(): boolean;

    contains(item: ItemType): boolean;

    any(listB: UniqueItemList): boolean;

    all(listB: UniqueItemList): boolean;

    add(
        item: ItemType,
        index?: number,
        moveToNewPosition?: boolean
    ): this;

    addLast(item: ItemType): this;

    addFirst(item: ItemType): this;

    addMultiple(items: ItemType[]): this;

    clone(out?: UniqueItemList): UniqueItemList;

    remove(item: ItemType): this;

    remove(
        item: undefined | null | false,
        index: number
    ): this;

    removeFirst(): this;

    removeLast(): this;

    removeMultiple(items: ItemType[]): this;

    clear(destroyItems?: boolean): this;

    pop(index?: number): ItemType;

    popFirst(): ItemType;

    popLast(): ItemType;

    popRandom(): ItemType;

    slice(
        startIndex: number,
        endIndex: number,
        out?: UniqueItemList
    ): UniqueItemList;

    sort(
        callback: (itemA: ItemType, itemB: ItemType) => number
    ): this;

    reverse(): this;

    shuffle(): this;

    union(
        listB: UniqueItemList,
        out?: UniqueItemList
    ): UniqueItemList;

    intersect(
        listB: UniqueItemList,
        out?: UniqueItemList
    ): UniqueItemList;

    difference(
        listB: UniqueItemList,
        out?: UniqueItemList
    ): UniqueItemList;

    call(
        callback: (item: ItemType, index: number) => void,
        scope?: object
    ): this;

    call(
        fnName: string, ...args: any
    ): this;

}