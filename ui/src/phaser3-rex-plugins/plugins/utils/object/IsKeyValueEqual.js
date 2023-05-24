var IsKeyValueEqual = function (objA, objB) {
    for (var key in objA) {
        if (!(key in objB)) {
            return false;
        }

        if (objA[key] !== objB[key]) {
            return false;
        }
    }

    for (var key in objB) {
        if (!(key in objA)) {
            return false;
        }
    }

    return true;
}

export default IsKeyValueEqual;