import MeshRenderTextureBase from '../../gameobjects/container/containerlite/rendertexture/MeshRenderTextureBase.js';
import RenderTexture from '../../gameobjects/mesh/quad/skewrendertexture/SkewRenderTexture.js';

class ContainerSkew extends MeshRenderTextureBase(RenderTexture) {
    get skewState() {
        return this.isRunning;
    }
}

export default ContainerSkew;
