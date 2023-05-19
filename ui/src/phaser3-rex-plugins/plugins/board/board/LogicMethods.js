import GetChessData from '../chess/GetChessData.js';
import GetChessUID from '../chess/GetChessUID.js';

import SetBoardWidth from './boarddata/SetBoardWidth.js';
import SetBoardHeight from './boarddata/SetBoardHeight.js';

import TileXYZToKey from '../utils/tilexyzkey/TileXYZToKey.js';
import TileXYToKey from '../utils/tilexyzkey/TileXYToKey.js';
import KeyToTileXYZ from '../utils/tilexyzkey/KeyToTileXYZ.js';

import TileXYToWorldX from './worldposition/TileXYToWorldX.js';
import TileXYToWorldY from './worldposition/TileXYToWorldY.js';
import TileXYToWorldXY from './worldposition/TileXYToWorldXY.js';
import TileXYArrayToWorldXYArray from './worldposition/TileXYArrayToWorldXYArray.js';
import WorldXYToTileX from './worldposition/WorldXYToTileX.js';
import WorldXYToTileY from './worldposition/WorldXYToTileY.js';
import WorldXYToTileXY from './worldposition/WorldXYToTileXY.js';
import WorldXYToChessArray from './worldposition/WorldXYToChessArray.js';
import WorldXYToChess from './worldposition/WorldXYToChess.js';
import WorldXYSnapToGrid from './worldposition/WorldXYSnapToGrid.js';
import AngleBetween from './worldposition/AngleBetween.js';
import IsAngleInCone from './worldposition/IsAngleInCone.js';
import AngleToward from './worldposition/AngleToward.js';
import AngleSnapToDirection from './worldposition/AngleSnapToDirection.js';
import IsOverlappingPoint from './worldposition/IsOverlappingPoint.js';
import GridAlign from './worldposition/GridAlign.js';
import GetGridPoints from './worldposition/GetGridPoints.js';
import GetGridBounds from './worldposition/GetGridBounds.js';
import GetBoardBounds from './worldposition/GetBoardBounds.js';

import LineToTileXYArray from './shape/LineToTileXYArray.js';
import CircleToTileXYArray from './shape/CircleToTileXYArray.js';
import EllipseToTileXYArray from './shape/EllipseToTileXYArray.js';
import PolygonToTileXYArray from './shape/PolygonToTileXYArray.js';
import RectangleToTileXYArray from './shape/RectangleToTileXYArray.js';
import TriangleToTileXYArray from './shape/TriangleToTileXYArray.js';
import ShapeToTileXYArray from './shape/ShapeToTileXYArray.js';
import ForEachTileXYInShape from './shape/ForEachTileXYInShape.js';

import UidToChess from './chess/UidToChess.js';
import AddChess from './chess/AddChess.js';
import SetChessTileZ from './chess/SetChessTileZ.js';
import RemoveChess from './chess/RemoveChess.js';
import RemoveAllChess from './chess/RemoveAllChess.js';
import SwapChess from './chess/SwapChess.js';
import GetAllChess from './chess/GetAllChess.js';

import Contains from './tileposition/Contains.js';
import ForEachTileXY from './tileposition/ForEachTileXY.js';
import GetWrapTileXY from './tileposition/GetWrapTileXY.js';
import TileXYZToChess from './tileposition/TileXYZToChess.js';
import TileXYToChessArray from './tileposition/TileXYToChessArray.js';
import TileZToChessArray from './tileposition/TileZToChessArray.js';
import TileXYArrayToChessArray from './tileposition/TileXYArrayToChessArray.js';
import ChessToTileXYZ from './tileposition/ChessToTileXYZ.js';
import GetOppositeDirection from './tileposition/GetOppositeDirection.js';
import GetDistance from './tileposition/GetDistance.js';
import DirectionBetween from './tileposition/DirectionBetween.js';
import IsDirectionInCone from './tileposition/IsDirectionInCone.js';

import Offset from './transform/Offset.js';
import Mirror from './transform/Mirror.js';
import Rotate from './transform/Rotate.js';
import Fit from './transform/Fit.js';

import IsEmptyTileXYZ from './empty/IsEmptyTileXYZ.js';
import GetEmptyTileXYArray from './empty/GetEmptyTileXYArray.js';
import GetRandomEmptyTileXY from './empty/GetRandomEmptyTileXY.js';
import GetEmptyTileXYArrayInRange from './empty/GetEmptyTileXYArrayInRange.js';
import GetRandomEmptyTileXYInRange from './empty/GetRandomEmptyTileXYInRange.js';

import GetTileXYAtDirection from './neighbors/GetTileXYAtDirection.js';
import GetNeighborTileXY from './neighbors/GetNeighborTileXY.js';
import GetNeighborTileXYAtAngle from './neighbors/GetNeighborTileXYAtAngle.js';
import GetNeighborChess from './neighbors/GetNeighborChess.js';
import GetNeighborTileDirection from './neighbors/GetNeighborTileDirection.js';
import GetNeighborChessDirection from './neighbors/GetNeighborChessDirection.js';
import AreNeighbors from './neighbors/AreNeighbors.js';
import MapNeighbors from './neighbors/MapNeighobrs.js';

import RingToTileXYArray from './ring/RingToTileXYArray.js';
import RingToChessArray from './ring/RingToChessArray.js';
import FilledRingToTileXYArray from './ring/FilledRingToTileXYArray.js';
import FilledRingToChessArray from './ring/FilledRingToChessArray.js';

import HasBlocker from './blocker/HasBlocker.js';
import HasEdgeBlocker from './blocker/HasEdgeBlocker.js';

import GetBoard from './chess/GetBoard.js';

export default {
    getChessData: GetChessData,
    getChessUID: GetChessUID,

    setBoardWidth: SetBoardWidth,
    setBoardHeight: SetBoardHeight,

    tileXYZToKey: TileXYZToKey,
    tileXYToKey: TileXYToKey,
    keyToTileXYZ: KeyToTileXYZ,

    tileXYToWorldX: TileXYToWorldX,
    tileXYToWorldY: TileXYToWorldY,
    tileXYToWorldXY: TileXYToWorldXY,
    tileXYArrayToWorldXYArray: TileXYArrayToWorldXYArray,
    worldXYToTileX: WorldXYToTileX,
    worldXYToTileY: WorldXYToTileY,
    worldXYToTileXY: WorldXYToTileXY,
    worldXYToChessArray: WorldXYToChessArray,
    worldXYToChess: WorldXYToChess,
    worldXYSnapToGrid: WorldXYSnapToGrid,
    angleBetween: AngleBetween,
    isAngleInCone: IsAngleInCone,
    angleToward: AngleToward,
    angleSnapToDirection: AngleSnapToDirection,
    isOverlappingPoint: IsOverlappingPoint,
    gridAlign: GridAlign,
    getGridPoints: GetGridPoints,
    getGridBounds: GetGridBounds,
    getBoardBounds: GetBoardBounds,

    lineToTileXYArray: LineToTileXYArray,
    circleToTileXYArray: CircleToTileXYArray,
    ellipseToTileXYArray: EllipseToTileXYArray,
    polygonToTileXYArray: PolygonToTileXYArray,
    rectangleToTileXYArray: RectangleToTileXYArray,
    triangleToTileXYArray: TriangleToTileXYArray,
    shapeToTileXYArray: ShapeToTileXYArray,
    forEachTileXYInShape: ForEachTileXYInShape,

    uidToChess: UidToChess,
    addChess: AddChess,
    removeChess: RemoveChess,
    removeAllChess: RemoveAllChess,
    swapChess: SwapChess,
    moveChess: AddChess,
    setChessTileZ: SetChessTileZ,
    getAllChess: GetAllChess,

    contains: Contains,
    forEachTileXY: ForEachTileXY,
    getWrapTileXY: GetWrapTileXY,
    tileXYZToChess: TileXYZToChess,
    tileXYToChessArray: TileXYToChessArray,
    tileZToChessArray: TileZToChessArray,
    tileXYArrayToChessArray: TileXYArrayToChessArray,
    chessToTileXYZ: ChessToTileXYZ,
    offset: Offset,
    mirror: Mirror,
    rotate: Rotate,
    getOppositeDirection: GetOppositeDirection,
    getDistance: GetDistance,
    directionBetween: DirectionBetween,
    isDirectionInCone: IsDirectionInCone,
    fit: Fit,

    isEmptyTileXYZ: IsEmptyTileXYZ,
    getEmptyTileXYArray: GetEmptyTileXYArray,
    getRandomEmptyTileXY: GetRandomEmptyTileXY,
    getEmptyTileXYArrayInRange: GetEmptyTileXYArrayInRange,
    getRandomEmptyTileXYInRange: GetRandomEmptyTileXYInRange,

    getTileXYAtDirection: GetTileXYAtDirection,
    getNeighborTileXY: GetNeighborTileXY,
    getNeighborTileXYAtAngle: GetNeighborTileXYAtAngle,
    getNeighborChess: GetNeighborChess,
    getNeighborTileDirection: GetNeighborTileDirection,
    getNeighborChessDirection: GetNeighborChessDirection,
    areNeighbors: AreNeighbors,
    mapNeighbors: MapNeighbors,

    ringToTileXYArray: RingToTileXYArray,
    ringToChessArray: RingToChessArray,
    filledRingToTileXYArray: FilledRingToTileXYArray,
    filledRingToChessArray: FilledRingToChessArray,

    hasBlocker: HasBlocker,
    hasEdgeBlocker: HasEdgeBlocker,

    getGridPoints: GetGridPoints,

    chessToBoard: GetBoard,
};