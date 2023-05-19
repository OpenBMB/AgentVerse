import CircleMaskImage from './CircleMaskImage';

export default function (
    x?: number, y?: number,
    key?: string, frame?: string,
    config?:
        null | 0 | 1 | 2 | 'circle' | 'ellipse' | 'roundRectangle' |
        CircleMaskImage.IConfig
): CircleMaskImage;