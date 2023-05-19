import NinePatch from "./NinePatch";

export default function (
    config?: NinePatch.IConfig
): NinePatch;

export default function (
    x: number, y: number,
    config?: NinePatch.IConfig
): NinePatch;

export default function (
    x: number, y: number,
    width: number, height: number,
    config?: NinePatch.IConfig
): NinePatch;

export default function (
    x: number, y: number,
    width: number, height: number,
    key: string,
    config?: NinePatch.IConfig
): NinePatch;

export default function (
    x: number, y: number,
    width: number, height: number,
    key: string,
    columns: (number | undefined)[], rows: (number | undefined)[],
    config?: NinePatch.IConfig
): NinePatch;

export default function (
    x: number, y: number,
    width: number, height: number,
    key: string, baseFrame: string,
    columns: (number | undefined)[], rows: (number | undefined)[],
    config?: NinePatch.IConfig
): NinePatch;