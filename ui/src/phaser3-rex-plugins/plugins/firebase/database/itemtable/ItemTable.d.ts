import EventEmitter from "../../../utils/eventemitter/EventEmitter";

export default ItemTable;

declare namespace ItemTable {

    type TableType = 1 | 2 | 3 | '1d' | '2d' | '3d';

    interface IConfig {
        root?: string,
        type?: TableType,

        eventEmitter?: EventEmitter | false,
    }

    type ValueType = number | string | boolean |
    { [name: string]: ValueType };

    type TransactionCallbackType = (prevValue: ValueType) => ValueType;

}

declare class ItemTable extends EventEmitter {
    constructor(
        config?: ItemTable.IConfig
    );

    setData(
        key0: string,
        value: ItemTable.ValueType
    ): Promise<void>;

    setData(
        key0: string, key1: string,
        value: ItemTable.ValueType
    ): Promise<void>;

    setData(
        key0: string, key1: string, key2: string,
        value: ItemTable.ValueType
    ): Promise<void>;

    incValue(
        key0: string,
        value: number
    ): Promise<void>;

    incValue(
        key0: string, key1: string,
        value: number
    ): Promise<void>;

    incValue(
        key0: string, key1: string, key2: string,
        value: number
    ): Promise<void>;

    removeData(
        key0: string
    ): Promise<void>;

    removeData(
        key0: string, key1: string
    ): Promise<void>;

    removeData(
        key0: string, key1: string, key2: string
    ): Promise<void>;

    updateData(
        data: { [path: string]: ItemTable.ValueType }
    ): Promise<void>;

    transaction(
        key0: string,
        callback: ItemTable.TransactionCallbackType
    ): Promise<void>;

    transaction(
        key0: string, key1: string,
        callback: ItemTable.TransactionCallbackType
    ): Promise<void>;

    transaction(
        key0: string, key1: string, key2: string,
        callback: ItemTable.TransactionCallbackType
    ): Promise<void>;

    removeDataOnDisconnect(
        key0: string,
    ): Promise<void>;

    removeDataOnDisconnect(
        key0: string, key1: string,
    ): Promise<void>;

    removeDataOnDisconnect(
        key0: string, key1: string, key2: string,
    ): Promise<void>;

    setDataOnDisconnect(
        key0: string,
        value: ItemTable.ValueType
    ): Promise<void>;

    setDataOnDisconnect(
        key0: string, key1: string,
        value: ItemTable.ValueType
    ): Promise<void>;

    setDataOnDisconnect(
        key0: string, key1: string, key2: string,
        value: ItemTable.ValueType
    ): Promise<void>;

    startUpdate(): this;
    stopUpdate(): this;

    getData(
    ): ItemTable.ValueType;

    getData(
        key0: string,
    ): ItemTable.ValueType;

    getData(
        key0: string, key1: string,
    ): ItemTable.ValueType;

    getData(
        key0: string, key1: string, key2: string,
    ): ItemTable.ValueType;

    cloneData(
    ): ItemTable.ValueType;

    cloneData(
        key0: string,
    ): ItemTable.ValueType;

    cloneData(
        key0: string, key1: string,
    ): ItemTable.ValueType;

    cloneData(
        key0: string, key1: string, key2: string,
    ): ItemTable.ValueType;

}