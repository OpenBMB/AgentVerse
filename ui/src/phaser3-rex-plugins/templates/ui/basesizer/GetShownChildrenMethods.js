export default {
    getShownChildren(out) {
        if (out === undefined) {
            out = [];
        }
        var children = this.children,
            child;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (child.rexSizer && child.rexSizer.hidden) { // Don't add hidden child
                continue;
            }

            out.push(child);
        }

        return out;
    },

    getAllShownChildren(out) {
        if (out === undefined) {
            out = [];
        }

        var queue = [this];
        while (queue.length > 0) {
            var current = queue.shift();
            if (current.rexSizer && current.rexSizer.hidden) {
                continue;
            }

            if (current !== this) {
                out.push(current);
            }

            if (current.isRexContainerLite) {
                queue.push(...current.children);
            }
        }

        return out;
    }
}