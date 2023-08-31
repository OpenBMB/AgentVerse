var SetRandomExpression = function () {
    var count = this._expressions.getSize();
    if (count === 0) {
        return this;
    }

    var index = Math.floor(Math.random() * count);
    this.setExpression(index);
    return this;
}

export default SetRandomExpression;