import Base from '../conditiontable/ConditionsTable';

export default ConditionsTable;

declare namespace ConditionsTable {
}

declare class ConditionsTable extends Base {

    loadYML(
        ymlString: string
    ): this;
}