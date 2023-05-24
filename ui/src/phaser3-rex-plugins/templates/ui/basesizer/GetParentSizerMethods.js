var GetParent = function (gameObject, name) {
    var parent = null;
    if (name === undefined) {
        if (gameObject.hasOwnProperty('rexContainer')) {
            parent = gameObject.rexContainer.parent;
            if (parent) {
                if (!parent.isRexSizer) {
                    // Try to get sizer parent
                    parent = GetParent(parent);
                }
            } else {
                parent = null;
            }
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


export default {
    getParentSizer(gameObject, name) {
        if (typeof (gameObject) === 'string') {
            name = gameObject;
            gameObject = undefined;
        }
        if (gameObject === undefined) {
            gameObject = this;
        }
        return GetParent(gameObject, name);
    },

    getTopmostSizer(gameObject) {
        if (gameObject === undefined) {
            gameObject = this;
        }
        return GetTopmostParent(gameObject);
    }
}