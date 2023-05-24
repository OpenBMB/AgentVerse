// import * as Phaser from 'phaser';
import LogicBoard from './LogicBoard';
import { TileXYZType, TileXYType } from '../types/Position';
import { Tap, Press, Swipe } from '../../gestures'

export default Board;

declare namespace Board {
    interface IConfig extends LogicBoard.IConfig { }

    interface SetInteractiveIConfig {
        enable?: boolean;
        useTouchZone?: boolean;
    }

    namespace Events {
        type KickOutCallbackType = (
            chessToAdd: unknown,
            occupiedChess: unknown,
            tileXYZ: TileXYZType
        ) => void;

        type TileDownCallbackType = (
            pointer: Phaser.Input.Pointer,
            tileXY: TileXYType
        ) => void;

        type GameObjectDownCallbackType = (
            pointer: Phaser.Input.Pointer,
            gameObject: Phaser.GameObjects.GameObject
        ) => void;

        type PointerDownCallbackType = (
            pointer: Phaser.Input.Pointer
        ) => void;

        type TileUpCallbackType = (
            pointer: Phaser.Input.Pointer,
            tileXY: TileXYType
        ) => void;

        type GameObjectUpCallbackType = (
            pointer: Phaser.Input.Pointer,
            gameObject: Phaser.GameObjects.GameObject
        ) => void;

        type PointerUpCallbackType = (
            pointer: Phaser.Input.Pointer
        ) => void;

        type TileMoveCallbackType = (
            pointer: Phaser.Input.Pointer,
            tileXY: TileXYType
        ) => void;

        type GameObjectMoveCallbackType = (
            pointer: Phaser.Input.Pointer,
            gameObject: Phaser.GameObjects.GameObject
        ) => void;

        type PointerMoveCallbackType = (
            pointer: Phaser.Input.Pointer
        ) => void;

        type TileOverCallbackType = (
            pointer: Phaser.Input.Pointer,
            tileXY: TileXYType
        ) => void;

        type GameObjectOverCallbackType = (
            pointer: Phaser.Input.Pointer,
            gameObject: Phaser.GameObjects.GameObject
        ) => void;

        type PointerOverCallbackType = (
            pointer: Phaser.Input.Pointer
        ) => void;

        type TileOutCallbackType = (
            pointer: Phaser.Input.Pointer,
            tileXY: TileXYType
        ) => void;

        type GameObjectOutCallbackType = (
            pointer: Phaser.Input.Pointer,
            gameObject: Phaser.GameObjects.GameObject
        ) => void;

        type PointerOutCallbackType = (
            pointer: Phaser.Input.Pointer
        ) => void;

        type TileTapCallbackType = (
            tap: Tap,
            tileXY: TileXYType
        ) => void;

        type GameObjectTapCallbackType = (
            tap: Tap,
            gameObject: Phaser.GameObjects.GameObject
        ) => void;

        type TapCallbackType = (tap: Tap) => void;

        type TilePressCallbackType = (
            press: Press,
            tileXY: TileXYType
        ) => void;

        type GameObjectPressCallbackType = (
            press: Press,
            gameObject: Phaser.GameObjects.GameObject
        ) => void;

        type PressCallbackType = (press: Press) => void;

        type TileSwipeCallbackType = (
            swipe: Swipe,
            tileXY: TileXYType
        ) => void;

        type GameObjectSwipeCallbackType = (
            swipe: Swipe,
            gameObject: Phaser.GameObjects.GameObject
        ) => void;

        type SwipeCallbackType = (swipe: Swipe) => void;
    }
}

declare class Board<ChessType = Phaser.GameObjects.GameObject> extends LogicBoard<ChessType> {
    constructor(scene: Phaser.Scene, config?: Board.IConfig);
    scene: Phaser.Scene;

    setInteractive(config?: Board.SetInteractiveIConfig): this;
    setInteractive(enable?: boolean): this;

    getTouchZone(): Phaser.GameObjects.Zone;
    readonly touchZone: Phaser.GameObjects.Zone;

    chessToBoard(chess: any): Board;
    static GetBoard(chess: any): Board;
}