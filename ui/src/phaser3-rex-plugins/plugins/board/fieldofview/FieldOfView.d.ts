import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import { TileXYType } from '../types/Position';
import Board from '../board/Board';

export default FieldOfView;

declare namespace FieldOfView {

    type ConeModeType = 0 | 1 | 'direction' | 'angle';

    type BLOCKER = null;
    type INFINITY = undefined;

    type PreTestCallbackType = (
        tileXYArray: TileXYType[],
        visiblePoints: number | INFINITY,
        fieldOfView: FieldOfView,
    ) => boolean;

    type CostCallbackType = (
        curTile: TileXYType,
        fieldOfView: FieldOfView,
        tileXYArray: TileXYType[]
    ) => number | BLOCKER;


    interface IConfig {
        face?: number,
        cone?: number | undefined,
        coneMode?: ConeModeType,

        // pre-test 
        occupiedTest?: boolean,
        blockerTest?: boolean,
        preTestCallback: PreTestCallbackType,
        preTestCallbackScope?: object,

        // cost 
        costCallback: CostCallbackType,
        costCallbackScope?: object,
        cost?: number,

        perspective?: boolean,

        debug?: {
            graphics: Phaser.GameObjects.Graphics,
            visibleLineColor?: number,
            invisibleLineColor?: number,
            log?: boolean,
        }
    }
}

declare class FieldOfView<ChessType = Phaser.GameObjects.GameObject> extends ComponentBase {
    constructor(
        gameObject: ChessType,
        config?: FieldOfView.IConfig
    );

    constructor(
        config?: FieldOfView.IConfig
    );

    readonly board: Board;

    setPreTestFunction(
        callback: FieldOfView.PreTestCallbackType,
        scope?: object
    ): this;

    setCostFunction(cost: number): this;
    setCostFunction(
        callback: FieldOfView.CostCallbackType,
        scope?: object
    ): this;

    isInLOS(
        chess: ChessType | TileXYType,
        visiblePoints?: number | FieldOfView.INFINITY,
        originTileXY?: TileXYType
    ): boolean;

    findFOV(
        visiblePoints?: number | FieldOfView.INFINITY,
        out?: TileXYType[]
    ): TileXYType[];

    findFOV(
        visiblePoints?: number | FieldOfView.INFINITY,
        originTileXY?: TileXYType,
        out?: TileXYType[]
    ): TileXYType[];

    LOS(
        chess: ChessType | TileXYType,
        visiblePoints?: number | FieldOfView.INFINITY,
        originTileXY?: TileXYType
    ): boolean;

    LOS(
        chess: (ChessType | TileXYType)[],
        out?: (ChessType | TileXYType)[],
    ): (ChessType | TileXYType)[];


    LOS(
        chess: (ChessType | TileXYType)[],
        originTileXY?: TileXYType,
        out?: (ChessType | TileXYType)[],
    ): (ChessType | TileXYType)[];

    LOS(
        chess: (ChessType | TileXYType)[],
        visiblePoints?: number | FieldOfView.INFINITY,
        out?: (ChessType | TileXYType)[],
    ): (ChessType | TileXYType)[];

    LOS(
        chess: (ChessType | TileXYType)[],
        visiblePoints?: number | FieldOfView.INFINITY,
        originTileXY?: TileXYType,
        out?: (ChessType | TileXYType)[],
    ): (ChessType | TileXYType)[];


    setFace(direction: number): this;
    face: number;

    clearDebugGraphics(): this;
    setDebugLineColor(
        visibleLineColor?: number | undefined,
        invisibleLineColor?: number | undefined
    ): this;

    readonly BLOCKER: FieldOfView.BLOCKER;
    readonly INFINITY: FieldOfView.INFINITY;
}
