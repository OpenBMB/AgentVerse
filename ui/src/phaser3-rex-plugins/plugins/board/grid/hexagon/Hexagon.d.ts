import { WorldXYType, TileXYType } from '../../types/Position';
import Rectangle from '../../../utils/geom/rectangle/Rectangle';

export default Hexagon;

declare namespace Hexagon {

    type HexagonGridStaggerAxisTypes = 0 | 1 | 'y' | 'x';
    type HexagonGridStaggerindexTypes = 0 | 1 | 'even' | 'odd';

    interface IConfig {
        x?: number, y?: number,
        size?: number,
        cellWidth?: number, cellHeight?: number,

        staggeraxis?: HexagonGridStaggerAxisTypes,
        staggerindex?: HexagonGridStaggerindexTypes
    }

}

declare class Hexagon {
    constructor(config?: Hexagon.IConfig);

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
    setCellRadius(size: number): this;
    readonly size: number;

    setType(
        staggeraxis: Hexagon.HexagonGridStaggerAxisTypes,
        staggerindex: Hexagon.HexagonGridStaggerindexTypes
    ): this;
    readonly staggeraxis: number;
    readonly staggerindex: number;
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