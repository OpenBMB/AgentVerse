import Container from '../../gameobjects/container/containerlite/ContainerLite';
import Quad from '../grid/quad/Quad';
import Hexagon from '../grid/hexagon/Hexagon';
import { TileXYZType } from '../types/Position';
import Board from '../board/Board';

export default MiniBoard;

declare namespace MiniBoard {

    type PutTestCallbackType = (
        targetTileXY: TileXYZType,
        mainBoard: Board,
        chess: Phaser.GameObjects.GameObject
    ) => boolean;

    interface IConfig {
        grid: Quad | Hexagon,

        draggable?: boolean,
        face?: number,

        putTestCallback?: PutTestCallbackType,
        putTestCallbackScpe?: unknown,
    }

    type MirrorModeType = 0 | 1 | 3 | 'x' | 'y' | 'x&y';

    type TileXYZMapType = { [uid: number]: TileXYZType };

    namespace Events {
        type PointerDownCallbackType = (
            pointer: Phaser.Input.Pointer,
            miniBoard: MiniBoard
        ) => void;

        type ChessDownCallbackType = (
            pointer: Phaser.Input.Pointer,
            gameObject: Phaser.GameObjects.GameObject
        ) => void;

        type PointerUpCallbackType = (
            pointer: Phaser.Input.Pointer,
            miniBoard: MiniBoard
        ) => void;

        type ChessUpCallbackType = (
            pointer: Phaser.Input.Pointer,
            gameObject: Phaser.GameObjects.GameObject
        ) => void;

        type PointerMoveCallbackType = (
            pointer: Phaser.Input.Pointer,
            miniBoard: MiniBoard
        ) => void;

        type ChessMoveCallbackType = (
            pointer: Phaser.Input.Pointer,
            gameObject: Phaser.GameObjects.GameObject
        ) => void;

        type DragCallbackType = (
            pointer: Phaser.Input.Pointer,
            dragX: number, dragY: number
        ) => void;
    }
}

declare class MiniBoard extends Container {
    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        config?: MiniBoard.IConfig
    );

    setFace(direction: number): this;
    face: number;

    addChess(
        chess: Phaser.GameObjects.GameObject,
        tileX: number,
        tileY: number,
        tileZ: number | string
    ): this;

    removeChess(
        chess: Phaser.GameObjects.GameObject,
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

    removeAllChess(
        destroy?: boolean
    ): this;

    setOrigin(
        originX: number,
        originY?: number
    ): this;
    setOrigin(
        origin: 'center' | 'top-left' | 'left-top'
    ): this;

    setPutTestCallback(
        callback: MiniBoard.PutTestCallbackType,
        scope?: object
    ): this;

    canPutOnMainBoard(
        mainBoard: Board,
        tileX?: number,
        tileY?: number,
        chessTileXYMap?: MiniBoard.TileXYZMapType,
    ): boolean;
    putOnMainBoard(
        mainBoard: Board,
        tileX?: number,
        tileY?: number,
        align?: boolean
    ): this;
    pullOutFromMainBoard(): this;
    putBack(): this;

    isOverlapping(
        mainBoard: Board
    ): boolean;

    alignToMainBoard(
        mainBoard: Board,
        tileX?: number,
        tileY?: number
    ): this;

    readonly mainBoard: Board;
    readonly tileX: number;
    readonly tileY: number;
    readonly grid: Quad | Hexagon;

    canRotate(n: number): boolean;
    canRotateTo(direction: number): boolean;
    rotate(n: number): this;
    rotateTo(direction: number): this;

    canMirror(
        mode: MiniBoard.MirrorModeType
    ): boolean;
    mirror(
        mode: MiniBoard.MirrorModeType
    ): this;

    readonly lastTransferResult: boolean;

    setInteractive(enable?: boolean): this;

    setDragEnable(enable?: boolean): this;

}