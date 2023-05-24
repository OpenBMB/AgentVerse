import CircularProgressCanvas from './CircularProgressCanvas';

export default function (
    config?: CircularProgressCanvas.IConfig
): CircularProgressCanvas;

export default function (
    x?: number, y?: number,
    radius?: number,
    barColor?: string | number,
    value?: number,
    config?: CircularProgressCanvas.IConfig
): CircularProgressCanvas;