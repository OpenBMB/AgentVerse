import GridSizer from './GridSizer';


export default function (
    config?: GridSizer.IConfig
): GridSizer;

export default function (
    x: number, y: number,
    config?: GridSizer.IConfig
): GridSizer;

export default function (
    x: number, y: number,
    width: number, height: number,
    config?: GridSizer.IConfig
): GridSizer;

export default function (
    x: number, y: number,
    width: number, height: number,
    column: number, row: number,
    config?: GridSizer.IConfig
): GridSizer;