class Base {
    constructor(pipeline, gameObject, config) {
        this.pipeline = pipeline;
        this.gameObject = gameObject;
        this.resetFromJSON(config);

        gameObject.once('destroy', this.destroy, this);
    }

    destroy() {
        this.pipeline = undefined;
        this.gameObject = undefined;
    }

    resetFromJSON(o) {
        return this;
    }

    onDrawSprite() {
    }
}

export default Base;