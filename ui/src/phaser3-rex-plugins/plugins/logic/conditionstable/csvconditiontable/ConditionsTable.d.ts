import Base from '../conditiontable/ConditionsTable';

export default ConditionsTable;

declare namespace ConditionsTable {
    interface ILoadConfig {
        delimiter?: string
    }
}

declare class ConditionsTable extends Base {

    loadCSV(
        csvString: string,
        config?: ConditionsTable.ILoadConfig
    ): this;
}