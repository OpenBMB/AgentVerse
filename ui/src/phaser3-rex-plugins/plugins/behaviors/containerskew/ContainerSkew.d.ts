import RenderTexture from '../../gameobjects/mesh/quad/skewrendertexture/SkewRenderTexture';
import ContainerLite from '../../gameobjects/container/containerlite/ContainerLite';

export default ContainerSkew;

declare namespace ContainerSkew {

    interface IConfig {
        useParentBounds?: boolean,
    }

}

declare class ContainerSkew extends RenderTexture {
    constructor(
        parentContainer: ContainerLite,
        config?: ContainerSkew.IConfig
    );

    enter(): this;
    exit(): this;
    readonly skewState: boolean;
}