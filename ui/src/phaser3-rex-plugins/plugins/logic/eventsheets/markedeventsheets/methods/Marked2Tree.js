import { ForceFailure, Succeeder } from '../../../behaviortree/index.js';
import EventBehaviorTree from '../../eventsheettrees/EventBehaviorTree.js';
import GetHeadingTree from './GetHeadingTree.js';
import GetTreeConfig from './GetTreeConfig.js';

import ParseNodes from './ParseNodes.js';
import GetConditionExpression from './GetConditionExpression.js';
import CreateTaskSequence from './CreateTaskSequence.js';

var Marked2Tree = function (markedString, {
    lineReturn = '\\',
    commentLineStart = '\/\/',
    parallel = false,
} = {}) {

    var headingTree = GetHeadingTree(markedString);
    var treeConfig = GetTreeConfig(headingTree.paragraphs);
    var { conditionNodes, mainTaskNodes, catchNodes } = ParseNodes(headingTree.children);

    var { parallel = parallel } = treeConfig;
    var taskSequenceConfig = { lineReturn, commentLineStart };

    var tree = new EventBehaviorTree({
        title: headingTree.title,
        parallel: parallel,
        condition: GetConditionExpression(conditionNodes)
    })

    var rootNode = tree.root;
    rootNode.addChild(CreateTaskSequence(mainTaskNodes, taskSequenceConfig));

    var forceFailure = new ForceFailure();
    if (catchNodes.length > 0) {
        forceFailure.addChild(CreateTaskSequence(catchNodes[0], taskSequenceConfig));
    } else {
        forceFailure.addChild(new Succeeder());
    }
    rootNode.addChild(forceFailure);

    return tree;
}

export default Marked2Tree;