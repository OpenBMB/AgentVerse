import ComponentBase from '../../utils/componentbase/ComponentBase';
import { TileXYType } from '../types/Position';
import Board from '../board/Board';

export default Monopoly;

declare namespace Monopoly {

    type STOP = -1;
    type BLOCKER = null;

    type NodeType = {
        x: number, y: number,
        direction: number
    }

    type CostCallbackType = (
        curTile: NodeType | null, preTile: NodeType | null,
        pathFinder: Monopoly
    )
        => number | STOP | BLOCKER;

    interface IConfig {
        face?: number,

        pathTileZ?: number,
        cost?: number,
        costCallback?: CostCallbackType,
        costCallbackScope?: object,
    }
}

declare class Monopoly<ChessType = Phaser.GameObjects.GameObject> extends ComponentBase {
    constructor(
        gameObject: ChessType,
        config?: Monopoly.IConfig
    );

    readonly gameObject: ChessType;
    readonly board: Board;

    setCostFunction(cost: number): this;
    setCostFunction(
        callback: Monopoly.CostCallbackType,
        scope?: object
    ): this;

    setFace(direction: number): this;

    getPath(
        movingPoints: number,
        out?: TileXYType[]
    ): TileXYType[];

    readonly STOP: Monopoly.STOP;
    readonly BLOCKER: Monopoly.BLOCKER;

}