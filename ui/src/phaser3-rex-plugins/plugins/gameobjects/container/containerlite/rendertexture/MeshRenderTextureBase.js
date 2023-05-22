import Init from './Init.js';
import Enter from './Enter.js';
import Exit from './Exit.js';

var MeshRenderTextureBase = function (RenderTextureOwnerClass) {
    return class Base extends RenderTextureOwnerClass {
        constructor(parentContainer, config) {
            var scene = parentContainer.scene;
            super(scene, 0, 0, 1, 1, config);
            scene.add.existing(this);

            Init(parentContainer, this, config);
        }

        destroy(fromScene) {
            if (!this.scene || this.ignoreDestroy) {
                return;
            }

            this.exit();
            super.destroy(fromScene);
        }

        enter() {
            var result = Enter(this.rexContainer.parent, this);
            if (result) {
                this.syncSize();
            }

            return this;
        }

        exit() {
            Exit(this.rexContainer.parent, this);
            return this;
        }
    }
}

export default MeshRenderTextureBase;