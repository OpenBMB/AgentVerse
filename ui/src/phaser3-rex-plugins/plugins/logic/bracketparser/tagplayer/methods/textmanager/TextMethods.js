export default {
    getTextGameObject(name) {
        return this.getGameObject('text', name);
    },

    addTextGameObject(name, gameObject) {
        this.addGameObject('text', name, gameObject);
        return this;
    }

}