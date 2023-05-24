var Contains = function (tileX, tileY, tileZ) {
    var result;
    if (this.infinityMode) {
        result = true;
    } else {
        result = (tileX >= 0) && (tileX < this.width) && (tileY >= 0) && (tileY < this.height);
    }
    if (result && (tileZ !== undefined)) {
        result = this.boardData.contains(tileX, tileY, tileZ);
    }
    return result;
};

export default Contains;