import ComponentBase from '../../utils/componentbase/ComponentBase';
import { TileXYType } from '../types/Position';
import Board from '../board/Board';

export default PathFinder;

declare namespace PathFinder {

    type PathModeTypes = 'random' | 'diagonal' | 'straight' | 'line' |
        'A*' | 'A*-random' | 'A*-line' |
        0 | 1 | 2 | 3 |
        10 | 11 | 12;

    type NodeType = {
        x: number, y: number,
        pathCost: number,
        preNodes: NodeType[]
    }

    type BLOCKER = null;
    type INFINITY = undefined;

    type CostCallbackType = (
        curTile: NodeType, preTile: NodeType,
        pathFinder: PathFinder
    )
        => number | BLOCKER | INFINITY;

    interface IConfig {
        occupiedTest?: boolean,
        blockerTest?: boolean,

        cost?: number,
        costCallback?: CostCallbackType,
        costCallbackScope?: object,
        cacheCost?: boolean,

        pathMode?: PathModeTypes,
        weight?: number,
        shuffleNeighbors?: boolean,
    }

}

declare class PathFinder extends ComponentBase {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: PathFinder.IConfig
    );

    constructor(
        config?: PathFinder.IConfig
    );

    setChess(gameObject: Phaser.GameObjects.GameObject): this;
    readonly gameObject: Phaser.GameObjects.GameObject;
    readonly board: Board;

    setCostFunction(cost: number): this;
    setCostFunction(
        callback: PathFinder.CostCallbackType,
        scope?: object
    ): this;

    setPathMode(
        pathMode: PathFinder.PathModeTypes
    ): this;

    findArea(
        movingPoints?: number | PathFinder.INFINITY,
        out?: PathFinder.NodeType[]
    ): PathFinder.NodeType[];

    getPath(
        endTileXY: TileXYType
    ): PathFinder.NodeType[];

    findPath(
        endTileXY: TileXYType,
        movingPoints?: number | PathFinder.INFINITY,
        isClosest?: boolean,
        out?: PathFinder.NodeType[]
    ): PathFinder.NodeType[];

    tileXYToCost(
        tileX: number,
        tileY: number,
        pathCost?: boolean
    ): number;

    readonly BLOCKER: PathFinder.BLOCKER;
    readonly INFINITY: PathFinder.INFINITY;
}