export default AppendData;

type BasicDataType = number | string;
type DictDataType = { [key: string]: BasicDataType } | { [key: string]: DictDataType } | { [key: string]: ListDateType };
type ListDateType = (BasicDataType | ListDateType | DictDataType)[];
type DataType = BasicDataType | DictDataType | ListDateType;

declare function AppendData(
    pngBuffer: Uint8Array,
    data: DataType | Uint8Array,
): Uint8Array;