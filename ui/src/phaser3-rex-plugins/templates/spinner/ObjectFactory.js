class ObjectFactory {
    constructor(scene) {
        this.scene = scene;
        this.displayList = scene.sys.displayList;
        this.updateList = scene.sys.updateList;

        scene.events.once('destroy', this.destroy, this);
    }

    destroy() {
        this.scene = null;
        this.displayList = null;
        this.updateList = null;
    }

    static register(type, callback) {
        ObjectFactory.prototype[type] = callback;
    }
};
export default ObjectFactory;