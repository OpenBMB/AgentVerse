export default ExtractData;

type BasicDataType = number | string;
type DictDataType = { [key: string]: BasicDataType } | { [key: string]: DictDataType } | { [key: string]: ListDateType };
type ListDateType = (BasicDataType | ListDateType | DictDataType)[];
type DataType = BasicDataType | DictDataType | ListDateType;

declare function ExtractData(
    pngBuffer: Uint8Array,
): DataType | Uint8Array;