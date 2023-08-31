export default CSVToArray;

declare namespace CSVToArray {
    interface IConfig {
        delimiter?: string,
        convert?: boolean
    }
}

declare function CSVToArray(
    csvString: string,
    config?: CSVToArray.IConfig
): any[][];