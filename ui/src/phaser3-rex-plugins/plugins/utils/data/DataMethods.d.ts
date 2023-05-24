export default DataMethods;

declare class DataMethods {
    setData(
        key: string,
        value: any
    ): this;
    setData(
        data: { [key: string]: any }
    ): this;

    getData(
        key: string,
        defaultValue?: any
    ): any;
    getData(): { [key: string]: any }

    incData(
        key: string,
        inc: number,
        defaultValue: number
    ): this;

    mulData(
        key: string,
        mul: number,
        defaultValue: number
    ): this;

    clearData(): this;
}