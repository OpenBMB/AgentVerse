// import * as Phaser from 'phaser';
import OverlapSizer from '../overlapsizer/OverlapSizer';
import {
    PerspectiveCard as Card
} from '../../../plugins/perspectiveimage';


export default PerspectiveCard;

declare namespace PerspectiveCard {

    interface IConfig extends OverlapSizer.IConfig, Card.IConfig {
        snapshotPadding?: number;
    }

}

declare class PerspectiveCard extends OverlapSizer {
    constructor(
        scene: Phaser.Scene,
        config?: PerspectiveCard.IConfig
    );

    flip: Card.Flip | undefined;

    setFace(face: Card.FaceTypes): this;
    toggleFace(): this;
    face: number;

    enterPerspectiveMode(): this;
    exitPerspectiveMode(): this;
    readonly isInPerspectiveMode: boolean;

    setSnapshotPadding(padding: number): this;
    snapshotPadding: number;

    snapshotFace(
        face: 'front' | 'back' | 0 | 1
    ): this;


    rotationX: number;
    rotationY: number;
    rotationZ: number;
    angleX: number;
    angleY: number;
    angleZ: number;

    panX(value: number): this;
    panY(value: number): this;
    panZ(value: number): this;

    transformVerts(
        x?: number, y?: number, z?: number,
        rotateX?: number, rotateY?: number, rotateZ?: number
    ): this;
}