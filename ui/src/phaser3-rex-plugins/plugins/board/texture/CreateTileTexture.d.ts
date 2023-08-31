import Board from '../board/Board';

export default function CreateTileTexture(
    board: Board,
    key: string,
    fillStyle: number | string | undefined,
    strokeStyle?: number | string | undefined,
    lineWidth?: number,
    lineJoin?: 'round' | 'bevel' | 'miter'
): void;

export default function CreateTileTexture(
    board: Board,
    key: string,
    fillStyle: number | string | undefined,
    strokeStyle?: number | string | undefined,
    lineWidth?: number,
    overlapGrid?: boolean,
    lineJoin?: 'round' | 'bevel' | 'miter'
): void;