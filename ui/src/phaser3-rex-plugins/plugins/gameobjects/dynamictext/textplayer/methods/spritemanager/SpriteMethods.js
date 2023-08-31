export default {
    getSprite(name) {
        return this.getGameObject('sprite', name);
    },

    addSprite(name, gameObject) {
        this.addGameObject('sprite', name, gameObject);
        return this;
    }

}