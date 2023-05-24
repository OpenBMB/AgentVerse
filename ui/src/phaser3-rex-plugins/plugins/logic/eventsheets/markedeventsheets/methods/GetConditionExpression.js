var GetConditionExpression = function (nodes) {
    if (!Array.isArray(nodes)) {
        return GetANDExpression(nodes);
    }

    var expression;
    switch (nodes.length) {
        case 0:
            expression = 'true';
            break;

        case 1:
            expression = GetANDExpression(nodes[0]);
            break;

        default:
            expression = nodes.map(function (node) {
                return `(${GetANDExpression(node)})`
            }).join(' || ');
            break;
    }

    return expression;
}

var GetANDExpression = function (node) {
    var paragraphs = node.paragraphs;
    var lines = [];
    for (var i = 0, cnt = paragraphs.length; i < cnt; i++) {
        var paragraph = paragraphs[i];
        if (paragraph.hasOwnProperty('block')) {
            continue;
        }

        lines.push(...paragraph.text.split('\n'))
    }

    var expression;
    switch (lines.length) {
        case 0:
            expression = 'true';
            break;

        case 1:
            expression = lines[0];
            break;

        default:
            expression = lines.map(function (line) { return `(${line})` }).join(' && ');
            break;

    }
    return expression;
}

export default GetConditionExpression;