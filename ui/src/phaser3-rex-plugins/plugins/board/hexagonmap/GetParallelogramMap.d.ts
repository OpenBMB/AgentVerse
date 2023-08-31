import { TileXYType } from '../types/Position';
import Board from '../board/LogicBoard';

export default function GetParallelogramMap(
    board: Board,
    type: 0 | 1 | 2,
    width: number,
    height: number,
    out?: TileXYType[]
): TileXYType[];