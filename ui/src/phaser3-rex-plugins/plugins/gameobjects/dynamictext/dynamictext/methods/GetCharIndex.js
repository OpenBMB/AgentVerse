import { IsChar } from '../bob/Types.js';

var GetCharIndex = function (childIndex, activeOnly) {
    if (typeof (childIndex) !== 'number') {
        childIndex = this.children.indexOf(childIndex);
        if (childIndex < 0) {
            return null;
        }
    }

    if (activeOnly === undefined) {
        activeOnly = true;
    }

    var children = this.children;
    if (childIndex >= children.length) {
        childIndex = children.length;
    }
    var charIndex = 0;
    for (var i = 0; i < childIndex; i++) {
        var child = children[i];
        if (activeOnly && !child.active) {
            continue;
        }

        if (IsChar(child) && !child.removed) {
            charIndex++;
        }
    }

    return charIndex;
}

export default GetCharIndex;