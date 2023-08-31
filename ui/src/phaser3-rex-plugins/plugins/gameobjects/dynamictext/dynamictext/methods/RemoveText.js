var RemoveText = function (index, length) {
    if (length === undefined) {
        length = 1;
    }

    for (var i = 0; i < length; i++) {
        var childIndex = this.getCharChildIndex(index, true);
        if (childIndex === undefined) {
            break;
        }
        this.removeChild(this.children[childIndex]);
    }
    return this;
}

export default RemoveText;