var Clear = function () {
    this.characterCollection.clear();

    this.frameManager
        .clear()
        .addToBitmapFont();

    return this;
}

export default Clear;