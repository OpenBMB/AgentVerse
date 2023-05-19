const Zone = Phaser.GameObjects.Zone;
const AddItem = Phaser.Utils.Array.Add;
const RemoveItem = Phaser.Utils.Array.Remove;

class Base extends Zone {
    constructor(scene, x, y, width, height) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }
        if (width === undefined) {
            width = 1;
        }
        if (height === undefined) {
            height = 1;
        }
        super(scene, x, y, width, height);
        this.children = [];
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        if (fromScene) {
            // Stop scene
            var child;
            for (var i = this.children.length - 1; i >= 0; i--) {
                child = this.children[i];
                if (!child.parentContainer &&  // Not in container
                    !child.displayList         // Not in scene, neither in layer
                ) {
                    // Destroy child which is not in scene, container, or layer manually
                    child.destroy(fromScene);
                }
            }
        }

        // Destroy/remove children
        this.clear(!fromScene);
        super.destroy(fromScene);
    }

    contains(gameObject) {
        return (this.children.indexOf(gameObject) !== -1);
    }

    add(gameObjects) {
        var parent = this;
        AddItem(this.children, gameObjects, 0,
            // Callback of item added
            function (gameObject) {
                gameObject.once('destroy', parent.onChildDestroy, parent);
            }, this);
        return this;
    }

    remove(gameObjects, destroyChild) {
        var parent = this;
        RemoveItem(this.children, gameObjects,
            // Callback of item removed
            function (gameObject) {
                gameObject.off('destroy', parent.onChildDestroy, parent);
                if (destroyChild) {
                    gameObject.destroy();
                }
            }
        );
        return this;
    }

    onChildDestroy(child, fromScene) {
        // Only remove reference
        this.remove(child, false);
    }

    clear(destroyChild) {
        var parent = this;
        var gameObject;
        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
            gameObject = this.children[i];
            gameObject.off('destroy', parent.onChildDestroy, parent);
            if (destroyChild) {
                gameObject.destroy();
            }
        }
        this.children.length = 0;
        return this;
    }
}

const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(Base,
    [
        Components.Alpha,
        Components.Flip
    ]
);

export default Base;