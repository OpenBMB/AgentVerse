import Render from './render/Render.js';
import Methods from './methods/Methods.js';
import PoolManager from './poolmanager/PoolManager.js';

const GameObject = Phaser.GameObjects.GameObject;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const List = Phaser.Structs.List;
const StableSort = Phaser.Utils.Array.StableSort;

class Blitter extends GameObject {
    constructor(scene, x, y, texture, frame, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            texture = GetValue(config, 'texture');
            frame = GetValue(config, 'frame');
        }

        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }

        super(scene, 'rexBlitter');

        this.children = new List();
        this.renderList = [];
        this.displayListDirty = false;
        this.lastAppendedChildren = [];

        var reuseBob = GetValue(config, 'reuseBob', true);
        this.poolManager = (reuseBob) ? (new PoolManager(config)) : undefined;

        this
            .setTexture(texture, frame)
            .setPosition(x, y)
            .setOrigin(0, 0)
            .clearTint()
            .initPipeline()

    }

    preDestroy() {
        this.removeChildren();
        this.children.destroy();
        this.renderList.length = 0;

        if (this.poolManager) {
            this.poolManager.destroy();
        }
    }

    getRenderList() {
        if (this.displayListDirty) {
            this.renderList.length = 0;
            var needDepthSort = false;

            var children = this.children.list;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                if (ChildCanRender(child)) {
                    this.renderList.push(child);

                    if (!needDepthSort) {
                        needDepthSort = (child.depth !== 0);
                    }
                }
            }

            if (needDepthSort) {
                StableSort(this.renderList, SortByDepth)
            }

            this.displayListDirty = false;
        }

        return this.renderList;
    }
}

var ChildCanRender = function (child) {
    return (child.active && child.visible && (child.alpha > 0));
}

var SortByDepth = function (childA, childB) {
    return childA._depth - childB._depth;
}

const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(Blitter,
    [
        Components.Alpha,
        Components.BlendMode,
        Components.ComputedSize,
        Components.Depth,
        Components.GetBounds,
        Components.Mask,
        Components.Origin,
        Components.Pipeline,
        Components.ScrollFactor,
        Components.Transform,
        Components.Visible,
        Render,

        Methods
    ]
);


export default Blitter;