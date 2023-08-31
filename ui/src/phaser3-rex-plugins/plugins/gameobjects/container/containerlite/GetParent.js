var GetParent = function (gameObject, name) {
    var parent;
    if (name === undefined) {
        if (gameObject.hasOwnProperty('rexContainer')) {
            parent = gameObject.rexContainer.parent;
        }
    } else {
        parent = GetParent(gameObject);
        while (parent) {
            if (parent.name === name) {
                break;
            }
            parent = GetParent(parent);
        }
    }
    return parent;
}

var GetTopmostParent = function (gameObject) {
    var parent = GetParent(gameObject);
    while (parent) {
        gameObject = parent;
        parent = GetParent(parent);
    }
    return gameObject;
}

export { GetParent, GetTopmostParent };