import MeshRenderTextureBase from '../../gameobjects/container/containerlite/rendertexture/MeshRenderTextureBase.js';
import RenderTexture from '../../gameobjects/mesh/perspective/rendertexture/RenderTexture.js';

class ContainerPerspective extends MeshRenderTextureBase(RenderTexture) {
    get perspectiveState() {
        return this.isRunning;
    }
}

export default ContainerPerspective;
