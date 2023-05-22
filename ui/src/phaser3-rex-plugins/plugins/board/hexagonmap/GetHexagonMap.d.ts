import { TileXYType } from '../types/Position';
import Board from '../board/LogicBoard';

export default function GetHexagonMap(
    board: Board,
    radius: number,
    out?: TileXYType[]
): TileXYType[];