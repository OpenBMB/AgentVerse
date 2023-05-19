import Sizer from './Sizer';

export default function (
    config?: Sizer.IConfig
): Sizer;

export default function (
    x: number, y: number,
    config?: Sizer.IConfig
): Sizer;

export default function (
    x: number, y: number,
    width: number, height: number,
    config?: Sizer.IConfig
): Sizer;

export default function (
    x: number, y: number,
    width: number, height: number,
    orientation?: Sizer.OrientationTypes,
    config?: Sizer.IConfig
): Sizer;