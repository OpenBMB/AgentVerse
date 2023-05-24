var SyncTo = function (gameObject) {
    this.setOrigin(gameObject.originX, gameObject.originY);
    this.setPosition(gameObject.x, gameObject.y);
    this.resize(gameObject.displayWidth, gameObject.displayHeight);
    return this;
}

export default SyncTo;