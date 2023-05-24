import Shape from './Shape';
import Board from '../board/LogicBoard';
import MiniBoard from '../miniboard/MiniBoard';

export default function (
    board: Board | MiniBoard,
    tileX: number, tileY: number, tileZ?: number,
    fillColor?: number | null, fillAlpha?: number | null,
    addToBoard?: boolean
): Shape;