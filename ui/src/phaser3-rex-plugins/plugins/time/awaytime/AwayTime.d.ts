export default AwayTime;

declare namespace AwayTime {
    interface IConfig {
        key?: string,
        peropd?: number
    }
}
declare class AwayTime {
    constructor(config?: AwayTime.IConfig);

    readonly awayTime: number;

    setKey(key: string): this;
    setPeriod(time: number): this;
}