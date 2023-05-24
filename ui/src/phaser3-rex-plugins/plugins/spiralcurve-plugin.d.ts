import SpiralCurve from './spiralcurve';

export default class SpiralCurvePlugin extends Phaser.Plugins.BasePlugin {
    add(
        config?: SpiralCurve.IConfig
    ): SpiralCurve;

    add(
        x?: number, y?: number,
        startRadius?: number, endRadius?: number,
        startAngle?: number, endAngle?: number,
        rotation?: number
    ): SpiralCurve

}