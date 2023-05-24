export default {
    setTint(tint) {
        // 0: Solid tint + texture alpha
        this.tint = tint;
        this.tintFill = false;
        return this;
    },

    setTintFill(tint) {
        // 1: Solid tint, no texture
        this.tint = tint;
        this.tintFill = true;
        return this;
    },

    clearTint() {
        this.setTint(0xffffff);
        return this;
    }
}