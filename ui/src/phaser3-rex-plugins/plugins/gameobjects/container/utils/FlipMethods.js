export default {
    setFlipX(value) {
        this.flipX = value;
        return this;
    },
    setFlipY(value) {
        this.flipY = value;
        return this;
    },
    toggleFlipX() {
        this.flipX = !this.flipX;
        return this;
    },
    toggleFlipY() {
        this.flipY = !this.flipY;
        return this;
    },
    setFlip(x, y) {
        this.flipX = x;
        this.flipY = y;
        return this;
    },
    resetFlip() {
        this.flipX = false;
        this.flipY = false;
        return this;
    }
}