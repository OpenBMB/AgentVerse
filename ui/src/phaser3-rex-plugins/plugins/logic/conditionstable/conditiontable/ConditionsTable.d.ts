export default ConditionsTable;

declare namespace ConditionsTable {

    type ContextType = {
        [name: string]: any
    }

    type ResultsType = {
        [name: string]: boolean
    }

    type TestFunctionType = (
        context: ContextType
    ) => boolean;

}

declare class ConditionsTable {

    clear(): this;

    add(
        name: string,
        callback: ConditionsTable.TestFunctionType
    ): this;

    getTestResults(
        context: ConditionsTable.ContextType,
    ): ConditionsTable.ResultsType;

    anyPassTest(
        context: ConditionsTable.ContextType,
        callback: (testName: string) => void,
        scope?: object
    ): this;

    anyPassTest(
        context: ConditionsTable.ContextType
    ): string;

    eachPassTest(
        context: ConditionsTable.ContextType,
        callback: (testName: string) => void,
        scope?: object
    ): this;

    eachTest(
        context: ConditionsTable.ContextType,
        callback: (testName: string, result: boolean) => void,
        scope?: object
    ): this;

}