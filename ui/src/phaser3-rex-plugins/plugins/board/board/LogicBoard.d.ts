import EE from '../../utils/eventemitter/EventEmitter';
import QuadGrid from '../grid/quad/Quad';
import HexagonGrid from '../grid/hexagon/Hexagon';
import Quad from '../grid/quad/Quad';
import Hexagon from '../grid/hexagon/Hexagon';
import {
    TileXYZType, TileXYType, TileXYDirectionType,
    WorldXYType
} from '../types/Position';
import Line from '../../utils/geom/line/Line';
import Circle from '../../utils/geom/circle/Circle';
import Rectangle from '../../utils/geom/rectangle/Rectangle';
import Ellipse from '../../utils/geom/ellipse/Ellipse';
import Triangle from '../../utils/geom/triangle/Triangle';
import Polygon from '../../utils/geom/polygon/Polygon';

export default Board;

declare namespace Board {
    type ForEachTileXYOrderTypes = 0 | 1 | 2 | 3 | 'x+' | 'x-' | 'y+' | 'y-';

    interface IConfigQuadGrid extends Quad.IConfig {
        gridType: 'quadGrid',
    }

    interface IConfigHexagonGrid extends Hexagon.IConfig {
        gridType: 'hexagonGrid',
    }

    interface IConfig {
        grid?: QuadGrid | HexagonGrid | IConfigQuadGrid | IConfigHexagonGrid,
        width?: number,
        height?: number,

        wrap?: boolean,
        infinity?: boolean
    }

    namespace Events {
        type KickOutCallbackType = (
            chessToAdd: unknown,
            occupiedChess: unknown,
            tileXYZ: TileXYZType
        ) => void;
    }

}

declare class Board<ChessType = unknown> extends EE {
    constructor(
        scene: unknown,
        config?: Board.IConfig
    );

    scene: unknown;

    setGrid(grid: QuadGrid | HexagonGrid | Board.IConfigQuadGrid | Board.IConfigHexagonGrid): this;
    grid: QuadGrid | HexagonGrid;

    setBoardWidth(width: number): this;
    readonly width: number;
    setBoardHeight(height: number): this;
    readonly height: number;

    setWrapMode(enable?: boolean): this;
    wrapMode: boolean;

    setInfinityMode(enable?: boolean): this;
    infinityMode: boolean;

    addChess(
        chess: ChessType,
        tileX: number,
        tileY: number,
        tileZ: number | string,
        align?: boolean
    ): this;

    removeChess(
        chess: ChessType,
        tileX?: null,
        tileY?: null,
        tileZ?: null,
        destroy?: boolean
    ): this;
    removeChess(
        chess: null,
        tileX: number,
        tileY: number,
        tileZ: number | string,
        destroy?: boolean
    ): this;

    removeAllChess(destroy?: boolean): this;

    moveChess(
        chess: ChessType,
        toTileX: number,
        toTileY: number,
        toTileZ: number | string,
        align?: boolean
    ): this;

    setChessTileZ(
        chess: ChessType,
        toTileZ: number | string,
        align?: boolean
    ): this;

    swapChess(
        chessA: ChessType,
        chessB: ChessType,
        align?: boolean
    ): this;

    chessToTileXYZ(
        chess: ChessType | TileXYType | number | undefined | null
    ): TileXYZType | null;

    tileXYZToChess(
        tileX: number,
        tileY: number,
        tileZ: number | string
    ): ChessType | null;

    tileXYToChessArray(
        tileX: number,
        tileY: number,
        out?: ChessType[]
    ): ChessType[];

    tileZToChessArray(
        tileZ: number,
        out?: ChessType[]
    ): ChessType[];

    tileXYArrayToChessArray(
        tileXYArray: TileXYType[],
        tileZ?: number | string,
        out?: ChessType[]
    ): ChessType[];
    tileXYArrayToChessArray(
        tileXYArray: TileXYType[],
        out?: ChessType[]
    ): ChessType[];

    worldXYToChessArray(
        worldX: number,
        worldY: number,
        out?: ChessType[]
    ): ChessType[];

    worldXYToChess(
        worldX: number,
        worldY: number,
        tileZ?: number | string
    ): ChessType;

    contains(
        tileX: number,
        tileY: number,
        tileZ?: number | string
    ): boolean;

    exists(
        chess: ChessType
    ): boolean;

    forEachTileXY(
        callback: (tileXY: TileXYType, board: Board<ChessType>) => void | boolean,
        scope?: object,
        order?: Board.ForEachTileXYOrderTypes
    ): this;

    tileXYToWorldXY(
        tileX: number,
        tileY: number,
        out?: WorldXYType | true
    ): WorldXYType;

    worldXYToTileXY(
        worldX: number,
        worldY: number,
        out?: TileXYType | true
    ): TileXYType;

    worldXYSnapToGrid(
        worldX: number,
        worldY: number,
        out?: WorldXYType | true
    ): WorldXYType;

    getDistance(
        tileA: ChessType | TileXYType,
        tileB: ChessType | TileXYType
    ): number;

    ringToTileXYArray(
        centerTileXY: ChessType | TileXYType,
        radius: number,
        out?: TileXYType[]
    ): TileXYType[];

    filledRingToTileXYArray(
        centerTileXY: ChessType | TileXYType,
        radius: number,
        nearToFar?: boolean,
        out?: TileXYType[]
    ): TileXYType[];
    filledRingToTileXYArray(
        centerTileXY: ChessType | TileXYType,
        radius: number,
        out?: TileXYType[]
    ): TileXYType[];

    lineToTileXYArray(
        line: Line,
        out?: TileXYType[]
    ): TileXYType[];
    lineToTileXYArray(
        startWorldX: number,
        startWorldY: number,
        endWorldX: number,
        endWorldY: number,
        out?: TileXYType[]
    ): TileXYType[];

    circleToTileXYArray(
        circle: Circle,
        out?: TileXYType[]
    ): TileXYType[];

    circleToTileXYArray(
        circle: Circle,
        testMode?: number,
        out?: TileXYType[]
    ): TileXYType[];

    rectangleToTileXYArray(
        rectangle: Rectangle,
        out?: TileXYType[]
    ): TileXYType[];

    rectangleToTileXYArray(
        rectangle: Rectangle,
        testMode?: number,
        out?: TileXYType[]
    ): TileXYType[];

    ellipseToTileXYArray(
        ellipse: Ellipse,
        out?: TileXYType[]
    ): TileXYType[];

    ellipseToTileXYArray(
        ellipse: Ellipse,
        testMode?: number,
        out?: TileXYType[]
    ): TileXYType[];

    triangleToTileXYArray(
        triangle: Triangle,
        out?: TileXYType[]
    ): TileXYType[];

    triangleToTileXYArray(
        triangle: Triangle,
        testMode?: number,
        out?: TileXYType[]
    ): TileXYType[];

    polygonToTileXYArray(
        polygon: Polygon,
        out?: TileXYType[]
    ): TileXYType[];

    polygonToTileXYArray(
        polygon: Polygon,
        testMode?: number,
        out?: TileXYType[]
    ): TileXYType[];

    angleBetween(
        tileA: ChessType | TileXYType,
        tileB: ChessType | TileXYType
    ): number;

    isAngleInCone(
        chessA: ChessType | TileXYType,
        chessB: ChessType | TileXYType,
        face: number,
        cone: number
    ): boolean;

    directionBetween(
        chessA: ChessType | TileXYType,
        chessB: ChessType | TileXYType,
        round?: boolean
    ): number;

    isDirectionInCone(
        chessA: ChessType | TileXYType,
        chessB: ChessType | TileXYType,
        face: number,
        cone: number
    ): boolean;

    getOppositeDirection(
        tileX: number | ChessType | TileXYType,
        tileY: number,
        direction?: number
    ): number;

    angleSnapToDirection(
        tileXY: ChessType | TileXYType | undefined,
        angle: number
    ): number;

    gridAlign(chess?: ChessType): this;

    isOverlappingPoint(
        worldX: number,
        worldY: number,
        tileZ?: number | string
    ): boolean;

    getNeighborTileXY(
        srcTileXY: ChessType | TileXYType,
        direction: number,
        out?: TileXYType | true
    ): TileXYDirectionType;
    getNeighborTileXY(
        srcTileXY: ChessType | TileXYType,
        direction: number | number[] | string | null,
        out?: TileXYType[]
    ): TileXYDirectionType | TileXYDirectionType[];

    getNeighborTileDirection(
        srcTile: ChessType | TileXYType,
        neighborTileXY: TileXYType
    ): number | null;

    getNeighborTileXYAtAngle(
        srcTileXY: ChessType | TileXYType,
        angle: number,
        out?: TileXYType | true
    ): TileXYType;

    getNeighborChess(
        tileXYZ: ChessType | TileXYType,
        direction: number | number[] | string | null,
        neighborTileZ?: number
    ): ChessType | ChessType[];

    areNeighbors(
        tileA: ChessType | TileXYType,
        tileB: ChessType | TileXYType
    ): boolean;

    mapNeighbors(
        tileXYZ: ChessType | TileXYType,
        callback: (
            tileXY: TileXYDirectionType,
            index: number,
            tileXYArray: TileXYDirectionType[]
        ) => any,
        scope?: object
    ): any[];

    mapNeighbors(
        tileXYZ: ChessType | TileXYType,
        distance: number,
        callback: (
            tileXY: TileXYDirectionType,
            index: number,
            tileXYArray: TileXYDirectionType[]
        ) => any,
        scope?: object
    ): any[];

    getTileXYAtDirection(
        srcTileXY: ChessType | TileXYType,
        direction: number | number[] | string | null,
        distance: number | number[] | { start?: number, end?: number, step?: number },
        out?: TileXYType[]
    ): TileXYDirectionType | TileXYDirectionType[];

    isEmptyTileXYZ(
        tileX: number,
        tileY?: number,
        tileZ?: number | string
    ): boolean;

    getRandomEmptyTileXY(
        tileZ: number | string,
        out?: TileXYType | true
    ): TileXYType;

    getEmptyTileXYArray(
        tileZ: number | string,
        out?: TileXYType[]
    ): TileXYType[];

    getRandomEmptyTileXYInRange(
        centerTileXY: ChessType | TileXYType,
        radius: number,
        tileZ: number | string,
        out?: TileXYType | true
    ): TileXYType;

    getEmptyTileXYArrayInRange(
        centerTileXY: ChessType | TileXYType,
        radius: number,
        tileZ: number | string,
        out?: TileXYType[]
    ): TileXYType[];

    getAllChess(): ChessType[];

    fit(tileXYArray: TileXYType[]): this;

    hasBlocker(
        tileX: number | ChessType | TileXYType,
        tileY?: number,
        tileZ?: number | string
    ): boolean;

    getGridPoints(
        tileX: number,
        tileY?: number,
        out?: WorldXYType[] | true
    ): WorldXYType[];
    getGridPoints(
        tileXY: ChessType | TileXYType,
        out?: WorldXYType[] | true
    ): WorldXYType[];

    chessToBoard(chess: any): Board;
    static GetBoard(chess: any): Board;

}