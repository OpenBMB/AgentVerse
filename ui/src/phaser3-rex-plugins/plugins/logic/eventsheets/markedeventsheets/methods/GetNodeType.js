var GetNodeType = function (node, typeNames) {
    var title = node.title.toLowerCase();
    for (var i = 0, cnt = typeNames.length; i < cnt; i++) {
        var typeName = typeNames[i];
        if (title.indexOf(`[${typeName}]`) > -1) {
            return typeName;
        }
    }

    return ''
}

export default GetNodeType