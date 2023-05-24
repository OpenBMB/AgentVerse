import marked from '../../../../utils/marked/marked.min.js';

var GetHeadingTree = function (text) {
    var items = marked.lexer(text);

    var tree = null;
    var parents = [];
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        switch (item.type) {
            case 'heading':
                var level = item.depth - 1;
                // First node
                if (tree === null) {
                    if (level === 0) {
                        var node = CreateNewNode(item.text);
                        parents.push(node);
                        tree = node;
                    }
                    // Ignore items if tree is null
                } else {
                    if (level <= parents.length) {
                        var node = CreateNewNode(item.text);
                        parents.length = level;
                        var lastNode = parents[parents.length - 1];
                        lastNode.children.push(node);
                        parents.push(node);
                    }
                    // Ignore items if out of parents
                }
                break;

            case 'paragraph':
            case 'code':
                if (parents.length === 0) {
                    continue;
                }
                // Append raw to last-node
                var lastNode = parents[parents.length - 1];
                var node = { text: item.text };
                if (item.lang) {
                    node.block = item.lang;
                }
                lastNode.paragraphs.push(node);
                break;

            // Ignore other kinds of items
        }
    }

    return tree;
}

var CreateNewNode = function (title) {
    return {
        title: title,
        paragraphs: [],
        children: [],
    }
}

export default GetHeadingTree;