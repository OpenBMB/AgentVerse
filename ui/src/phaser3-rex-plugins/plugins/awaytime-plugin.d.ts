import AwayTime from './awaytime'

export default class AwayTimePlugin extends Phaser.Plugins.BasePlugin {
    add(config?: AwayTime.IConfig): AwayTime;

    readonly awayTime: number;

    setKey(key: string): this;
    setPeriod(time: number): this;

}