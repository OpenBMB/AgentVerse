import Board from '../board/Board';

export default CreateBoardFromTilemap;

declare function CreateBoardFromTilemap(
    tilemap: Phaser.Tilemaps.Tilemap,
    layers?: Phaser.Tilemaps.TilemapLayer[] | Phaser.Tilemaps.TilemapLayer | string[] | string
): Board;
