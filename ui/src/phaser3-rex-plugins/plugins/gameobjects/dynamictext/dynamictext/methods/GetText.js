var GetText = function (activeOnly) {
    var text = ''
    this.forEachCharChild(function (child) {
        text += child.text;
    }, undefined, activeOnly);
    return text;
}

export default GetText;