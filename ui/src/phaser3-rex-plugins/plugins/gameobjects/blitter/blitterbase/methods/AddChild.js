var AddChild = function (bob) {
    this.lastAppendedChildren.length = 0;

    if (Array.isArray(bob)) {
        this.children.add(bob)
        this.lastAppendedChildren.push(...bob);
    } else {
        this.children.add(bob);
        this.lastAppendedChildren.push(bob);
    }

    return this;
}

export default AddChild;