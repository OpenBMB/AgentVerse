var OnExpressionStart = function (gameObject, name) {
    gameObject.emit(`expression.start-${name}`);
    gameObject.emit('expression.start', name);
}

export default OnExpressionStart;