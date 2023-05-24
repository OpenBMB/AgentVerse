export default CsvToHashTable;

declare namespace CsvToHashTable {
    type ConverCallbackType = (value: string, rowKey: string | number, colKey: string | number) => any;

    type AppendDataCallbackType = (table: CsvToHashTable, rowKey: string | number, colKey: string | number) => any

    type SortModeType = 0 | 1 | 2 | 3 | 'ascending' | 'descending' | 'logical ascending' | 'logical descending';

    type SortCallbackType = (key0: string, key1: string) => number;

    type EachCallbackType = (table: CsvToHashTable, rowKey: string | number, colKey: string | number, value: any) => void;

    interface ILoadConfig {
        delimiter?: string,
        convert?: boolean | ConverCallbackType,
        convertScope?: object
    }
}

declare class CsvToHashTable {
    constructor();

    destroy(): void;

    loadCSV(
        csvString: string,
        config?: CsvToHashTable.ILoadConfig
    ): this;

    convertCol(
        colKey: string | number,
        convertCallback?: boolean | CsvToHashTable.ConverCallbackType,
        convertCallbackScope?: object
    ): this;

    convertRow(
        rowKey: string | number,
        convertCallback?: boolean | CsvToHashTable.ConverCallbackType,
        convertCallbackScope?: object
    ): this;

    get(
        rowKey: string | number, colKey: string | number
    ): any;

    set(
        rowKey: string | number, colKey: string | number,
        value: any
    ): this;

    add(
        rowKey: string | number, colKey: string | number,
        value: number
    ): this;

    hasRowKey(rowKey: string | number): boolean;

    hasColKey(colKey: string | number): boolean;

    hasKey(rowKey: string | number, colKey: string | number): boolean;

    isValueInRol(rowKey: string | number, data: any): boolean;

    isValueInCol(colKey: string | number, data: any): boolean;

    clear(): this;

    appendCol(
        colKey: string | number,
        initValue: any
    ): this;

    appendCol(
        colKey: string | number,
        callback: CsvToHashTable.AppendDataCallbackType,
        scope?: object
    ): this;

    appendRow(
        rowKey: string | number,
        initValue: any
    ): this;

    appendRow(
        rowKey: string | number,
        callback: CsvToHashTable.AppendDataCallbackType,
        scope?: object
    ): this;

    removeCol(colKey: string | number): this;

    removeRol(rowKey: string | number): this;

    sortCol(
        colKey: string | number,
        mode: CsvToHashTable.SortModeType
    ): this;

    sortCol(
        callback: CsvToHashTable.SortCallbackType,
        scope?: object
    ): this;

    sortRow(
        rowKey: string | number,
        mode: CsvToHashTable.SortModeType
    ): this;

    sortRow(
        callback: CsvToHashTable.SortCallbackType,
        scope?: object
    ): this;

    eachCol(rowKey: string | number,
        callback: CsvToHashTable.EachCallbackType,
        scope?: object
    ): this;

    eachRow(colKey: string | number,
        callback: CsvToHashTable.EachCallbackType,
        scope?: object
    ): this;

}