class Live2dGameObjectBase extends Phaser.GameObjects.GameObject { 

}

const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(Live2dGameObjectBase,
    [
        Components.AlphaSingle,
        Components.BlendMode,
        Components.ComputedSize,
        Components.Depth,
        Components.GetBounds,
        Components.Origin,
        Components.ScrollFactor,
        Components.Transform,
        Components.Visible,
    ]
);

export default Live2dGameObjectBase;