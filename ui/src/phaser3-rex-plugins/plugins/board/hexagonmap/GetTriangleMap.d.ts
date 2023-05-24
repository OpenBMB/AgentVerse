import { TileXYType } from '../types/Position';
import Board from '../board/LogicBoard';

export default function GetTriangleMap(
    board: Board,
    type: 0 | 1,
    height: number,
    out?: TileXYType[]
): TileXYType[];