import LineProgress from './LineProgress';

export default function (
    config?: LineProgress.IConfig
): LineProgress;

export default function (
    x?: number, y?: number,
    radius?: number,
    barColor?: string | number,
    value?: number,
    config?: LineProgress.IConfig
): LineProgress;