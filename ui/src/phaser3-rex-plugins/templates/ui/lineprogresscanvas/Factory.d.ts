import LineProgressCanvas from './LineProgressCanvas';

export default function (
    config?: LineProgressCanvas.IConfig
): LineProgressCanvas;

export default function (
    x?: number, y?: number,
    width?: number, height?: number,
    config?: LineProgressCanvas.IConfig
): LineProgressCanvas;

export default function (
    x?: number, y?: number,
    width?: number, height?: number,
    barColor?: string | number,
    value?: number,
    config?: LineProgressCanvas.IConfig
): LineProgressCanvas;