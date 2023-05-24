class ObjectFactory {
    constructor(scene) {
        this.scene = scene;
    }

    static register(type, callback) {
        ObjectFactory.prototype[type] = callback;
    }
};
export default ObjectFactory;