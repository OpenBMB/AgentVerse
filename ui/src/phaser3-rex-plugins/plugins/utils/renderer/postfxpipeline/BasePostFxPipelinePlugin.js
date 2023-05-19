import RegisterPostPipeline from './RegisterPostPipeline.js';
import AddPostFxPipelineInstance from './AddPostFxPipelineInstance.js';
import RemovePostFxPipelineInstance from './RemovePostFxPipelineInstance.js';
import GetPostFxPipelineInstance from './GetPostFxPipelineInstance.js'

class BasePostFxPipelinePlugin extends Phaser.Plugins.BasePlugin {
    setPostPipelineClass(PostFxPipelineClass, postFxPipelineName) {
        this.PostFxPipelineClass = PostFxPipelineClass;
        this.postFxPipelineName = postFxPipelineName;
        return this;
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);

        RegisterPostPipeline(this.game, this.postFxPipelineName, this.PostFxPipelineClass);
    }

    add(gameObject, config) {
        return AddPostFxPipelineInstance(gameObject, this.PostFxPipelineClass, config);
    }

    remove(gameObject, name) {
        RemovePostFxPipelineInstance(gameObject, this.PostFxPipelineClass, name);
        return this;
    }

    get(gameObject, name) {
        return GetPostFxPipelineInstance(gameObject, this.PostFxPipelineClass, name);
    }
}

export default BasePostFxPipelinePlugin;