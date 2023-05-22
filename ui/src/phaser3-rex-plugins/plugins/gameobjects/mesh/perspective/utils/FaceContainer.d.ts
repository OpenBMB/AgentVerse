import Container from '../../../container/containerlite/ContainerLite';
import Image from '../image/Image';
import RenderTexture from '../rendertexture/RenderTexture';

type FaceTypes = Image | RenderTexture;
type FacesTypes = FaceTypes[] | { [name: string]: FaceTypes }

export default class FaceContainer extends Container {
    constructor(scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        faces: FacesTypes
    )

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

    setDebug(
        graphic: Phaser.GameObjects.Graphics,
        callback?: Function
    ): this;

    forEachFace(
        callback: (face: FaceTypes, i: number, faces: FacesTypes) => boolean | undefined,
        scope?: object,
        ignoreInvalid?: boolean
    ): this;
}