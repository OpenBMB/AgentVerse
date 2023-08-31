export default {
    setBoxSize(size) {
        this.dirty = this.dirty ||
            (this.boxSize !== size);

        this.boxSize = size;
        return this;
    },

    setCheckerSize(size) {
        this.dirty = this.dirty ||
            (this.checkerSize !== size);

        this.checkerSize = size;
        return this;
    }
}