export default LZString;

declare namespace LZString {
    type EncodingType = 0 | 1 | 2 | 3 | 'none' | 'base64' | 'utf16' | 'uri';

    interface IConfig {
        encoding?: EncodingType
    }
}

declare class LZString {
    constructor(
        config?: LZString.IConfig
    );

    compress(src: string): string;

    decompress(result: string): string;

    setEncoding(mode: LZString.EncodingType): this;

}