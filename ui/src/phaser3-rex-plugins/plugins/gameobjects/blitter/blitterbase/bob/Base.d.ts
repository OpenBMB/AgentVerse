import BlitterBase from '../BlitterBase';
import DataMethods from '../../../../utils/data/DataMethods';

export default BobBase;

declare class BobBase extends DataMethods{
    constructor(
        parent: BlitterBase,
        type: string
    );

    parent: BlitterBase;
    setParent(
        parent?: BlitterBase
    ): this;

    active: boolean;
    setActive(
        active?: boolean
    ): this;

    reset(): this;
}