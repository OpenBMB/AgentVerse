import RoundUpPowerOf2 from '../../../../utils/math/RoundUpPowerOf2.js';

const Shader = Phaser.GameObjects.Shader;
const AddItem = Phaser.Utils.Array.Add;
const RemoveItem = Phaser.Utils.Array.Remove;

class EffectLayer extends Shader {
    constructor(scene, key, x, y, width, height) {
        // gameObjects -> render-texture -> shader

        if (typeof (x) === 'object') {
            var config = x;
            ({ x, y, width, height } = config)
        }

        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = scene.sys.scale.width; }
        if (height === undefined) { height = scene.sys.scale.height; }

        // render-texture -> shader
        width = RoundUpPowerOf2(width);
        height = RoundUpPowerOf2(height);
        var rt = scene.make.renderTexture({ x: x, y: y, width: width, height: height, add: false });

        super(scene, key, x, y, width, height);
        this.type = 'rexEffectLayer';

        this
            .setSampler2DBuffer('iChannel0', rt.frame.glTexture, width, height, 0)
            .setScrollFactor(0)
            .setOrigin(0);

        this.rt = rt;

        this.children = [];

        this.boot();
    }

    boot() {
        this.scene.game.events.on('prerender', this.drawTargets, this);
        this.scene.sys.scale.on('resize', this.onWindowResize, this);
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        this.scene.game.events.off('prerender', this.drawTargets, this);
        this.scene.sys.scale.off('resize', this.onWindowResize, this);
        // Private texture will be removed by shader game object
        this.clear();

        super.destroy(fromScene);

        this.rt.destroy(fromScene);
        this.rt = null;
    }

    drawTargets() {
        // Assume that game objects are displayed on main camera.
        var camera = this.scene.sys.cameras.main;
        var offsetX = camera.scrollX + this.x;
        var offsetY = camera.scrollY + this.y;

        var rt = this.rt;
        rt.clear();
        var child;
        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
            child = this.children[i];
            rt
                .draw(
                    child,
                    child.x - offsetX,
                    child.y - offsetY
                )
        }
    }

    set1f(key, value) {
        this.setUniform(`${key}.value`, value);
        return this;
    }

    set2f(key, x, y) {
        this.setUniform(`${key}.value.x`, x);
        this.setUniform(`${key}.value.y`, y);
        return this;
    }

    set3f(key, x, y, z) {
        this.setUniform(`${key}.value.x`, x);
        this.setUniform(`${key}.value.y`, y);
        this.setUniform(`${key}.value.z`, z);
        return this;
    }

    setFloat4(key, x, y, z, w) {
        this.setUniform(`${key}.value.x`, x);
        this.setUniform(`${key}.value.y`, y);
        this.setUniform(`${key}.value.z`, z);
        this.setUniform(`${key}.value.w`, w);
        return this;
    }

    contains(gameObject) {
        return (this.children.indexOf(gameObject) !== -1);
    }

    add(gameObjects) {
        AddItem(this.children, gameObjects, 0,
            // Callback of item added
            function (gameObject) {
                gameObject.once('destroy', this.onChildDestroy, this);
            }, this);
        return this;
    }

    remove(gameObjects, destroyChild) {
        if (destroyChild === undefined) {
            destroyChild = false;
        }
        RemoveItem(this.children, gameObjects,
            // Callback of item removed
            function (gameObject) {
                gameObject.off('destroy', this.onChildDestroy, this);
                if (destroyChild) {
                    gameObject.destroy();
                }
            }
        );
        return this;
    }

    clear(destroyChild) {
        var gameObject;
        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
            gameObject = this.children[i];
            gameObject.off('destroy', this.onChildDestroy, this);
            if (destroyChild) {
                gameObject.destroy();
            }
        }
        this.children.length = 0;
        return this;
    }

    onChildDestroy(child, fromScene) {
        this.remove(child, !fromScene);
    }

    resize(width, height) {
        width = RoundUpPowerOf2(width);
        height = RoundUpPowerOf2(height);

        var rt = this.rt;

        // Set size of render texture
        rt.setSize(width, height);
        this.setSampler2DBuffer('iChannel0', rt.frame.glTexture, width, height, 0);

        // Set size of shader
        this.setSize(width, height);
        return this;
    }

    onWindowResize() {

        // Get new window size
        var width = this.scene.sys.scale.width;
        var height = this.scene.sys.scale.height;
        this.resize(width, height);
    }
}

export default EffectLayer;