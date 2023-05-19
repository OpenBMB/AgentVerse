export default VPXYToXY;

declare function VPXYToXY(
    vpx: number,
    vpy: number,
    vpxOffset: number,
    vpyOffset: number,
    viewport: Phaser.Geom.Rectangle,
    out?: Phaser.Math.Vector2,
): Phaser.Math.Vector2;

declare function VPXYToXY(
    vpx: number,
    vpy: number,
    viewport: Phaser.Geom.Rectangle,
    out?: Phaser.Math.Vector2,
): Phaser.Math.Vector2;