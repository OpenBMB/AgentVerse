class ObjectFactory {
    constructor() {
    }

    initializeApp(config) {
        firebase.initializeApp(config);
        return this;
    }

    static register(type, callback) {
        ObjectFactory.prototype[type] = callback;
    }
};

export default ObjectFactory;