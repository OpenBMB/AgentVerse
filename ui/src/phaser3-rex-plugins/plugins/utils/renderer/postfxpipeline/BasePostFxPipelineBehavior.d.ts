export default BasePostFxPipelineBehavior;

declare namespace BasePostFxPipelineBehavior {
}

declare class BasePostFxPipelineBehavior {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: {}
    );

    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        PostFxPipelineClass?: Phaser.Renderer.WebGL.Pipelines.PostFXPipeline
    );

    getPipeline(
        config?: {}
    ): Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;

    freePipeline(): this;
}