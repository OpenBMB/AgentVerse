export default GameObjectLocalXYToWorldXY;

declare function GameObjectLocalXYToWorldXY(
    gameObject: Phaser.GameObjects.GameObject,
    localX: number,
    localY: number,
    out?: { x: number, y: number } | true
): { x: number, y: number };