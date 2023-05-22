import { WorldXYType, TileXYType } from '../../types/Position';
import Rectangle from '../../../utils/geom/rectangle/Rectangle';

export default Quad;

declare namespace Quad {

    type QuadGridTypes = 0 | 1 | 'orthogonal' | 'isometric';
    type QuadGridDirTypes = 4 | 8 | '4dir' | '8dir';

    interface IConfig {
        x?: number, y?: number,
        cellWidth?: number, cellHeight?: number,

        type?: QuadGridTypes,

        dir?: QuadGridDirTypes
    }

}

declare class Quad {
    constructor(config?: Quad.IConfig);

    setOriginPosition(
        worldX: number,
        worldY: number
    ): this;
    x: number;
    y: number;

    setCellSize(
        width: number,
        height: number
    ): this;
    width: number;
    height: number;

    setType(
        type: Quad.QuadGridTypes
    ): this;
    readonly mode: number;

    getWorldXY(
        tileX: number,
        tileY: number,
        out?: WorldXYType | true
    ): WorldXYType;

    getTileXY(
        worldX: number,
        worldY: number,
        out?: TileXYType | true
    ): TileXYType;

    getGridPoints(
        tileX: number,
        tileY: number,
        points?: WorldXYType[]
    ): WorldXYType[];

    getBounds(
        tileX: number,
        tileY: number,
        out?: Rectangle
    ): Rectangle;
}