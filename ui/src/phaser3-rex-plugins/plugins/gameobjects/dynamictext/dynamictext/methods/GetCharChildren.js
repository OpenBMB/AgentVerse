var GetCharChildren = function (activeOnly, out) {
    if (out === undefined) {
        out = [];
    }

    this.forEachCharChild(function (child) {
        out.push(child);
    }, undefined, activeOnly);

    return out;
}

export default GetCharChildren;