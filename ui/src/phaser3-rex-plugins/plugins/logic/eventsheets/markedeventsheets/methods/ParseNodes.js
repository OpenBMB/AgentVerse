import GetNodeType from './GetNodeType.js';

const STATE_CONDITION = 1;
const STATE_TASK = 2;
const STATE_CATCH = 3;

var TypeNames = ['condition', 'catch'];

var ParseNodes = function (nodes) {
    var conditionNodes = [];
    var mainTaskNodes = [];
    var catchNodes = [];

    var state = STATE_CONDITION;
    var nextNodeType = GetNodeType(nodes[0], TypeNames);
    for (var i = 0, cnt = nodes.length; i < cnt; i++) {
        var node = nodes[i];
        if (state === STATE_CONDITION) {
            if (nextNodeType === '') {
                state = STATE_TASK;
            } else if (nextNodeType === 'catch') {
                state = STATE_CATCH;
            }
        } else if (state === STATE_TASK) {
            if (nextNodeType === 'catch') {
                state = STATE_CATCH;
            }
        }

        switch (state) {
            case STATE_CONDITION:
                conditionNodes.push(node)
                break;

            case STATE_TASK:
                mainTaskNodes.push(node);
                break;

            case STATE_CATCH:
                catchNodes.push(node);
                break;
        }

        if ((i + 1) < cnt) {
            nextNodeType = GetNodeType(nodes[i + 1], TypeNames);
        }
    }

    return {
        conditionNodes: conditionNodes,
        mainTaskNodes: mainTaskNodes,
        catchNodes: catchNodes,
    }
}

export default ParseNodes;