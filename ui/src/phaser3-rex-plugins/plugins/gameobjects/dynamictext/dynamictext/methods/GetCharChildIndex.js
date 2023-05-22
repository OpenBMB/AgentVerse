import { IsChar } from '../bob/Types.js';

var GetCharChildIndex = function (charIndex, activeOnly) {
    if (activeOnly === undefined) {
        activeOnly = true;
    }

    var children = this.children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (activeOnly && !child.active) {
            continue;
        }

        if (IsChar(child) && !child.removed) {
            if (charIndex === 0) {
                return i;
            } else {
                charIndex--;
            }
        }
    }

    return undefined;
}

export default GetCharChildIndex;