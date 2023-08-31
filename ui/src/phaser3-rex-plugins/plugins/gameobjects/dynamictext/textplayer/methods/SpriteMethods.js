export default {
    getSprite(name) {
        return this.spriteManager.getGO(name);
    },

    addSprite(name, gameObject) {
        this.spriteManager.addGO(name, gameObject);
        return this;
    }

}