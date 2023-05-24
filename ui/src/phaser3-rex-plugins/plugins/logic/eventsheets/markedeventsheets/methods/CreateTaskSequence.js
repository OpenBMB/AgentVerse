import { Sequence, Selector, If, Succeeder, RepeatUntilFailure, Abort, Failer } from '../../../behaviortree';
import GetNodeType from './GetNodeType.js';
import GetConditionExpression from './GetConditionExpression';
import ParseProperty from './ParseProperty';
import TaskSequence from '../../eventsheettrees/TaskSequence';
import TaskAction from '../../eventsheettrees/TaskAction.js';

var TypeNames = ['if', 'else', 'while'];

var CreateTaskSequence = function (node, config) {

    if (Array.isArray(node)) {
        var nodes = node;
        if (nodes.length === 1) {
            return CreateTaskSequence(nodes[0], config);

        } else {
            var sequence = new Sequence({ title: '[root]' });
            var lastIfSelector;
            for (var i = 0, cnt = nodes.length; i < cnt; i++) {
                var node = nodes[i];
                var child = CreateTaskSequence(node, config);
                // Construct if-branch selector
                switch (child.title) {
                    case '[if]':
                        sequence.addChild(child);
                        lastIfSelector = child;
                        break;

                    case '[else]':
                        if (lastIfSelector) {
                            lastIfSelector.insertChild(child, null, -1);
                        } else {
                            // No [If] heading before this [else] heading
                            console.warn(`Can't find [If] heading before '${node.title}'`);
                        }
                        break;

                    default:  // Normal tasks
                        sequence.addChild(child);
                        lastIfSelector = null;
                        break;
                }

            }
            return sequence;

        }

    } else {
        var nodeType = GetNodeType(node, TypeNames);
        switch (nodeType) {
            case 'if':
                var selector = new Selector({
                    title: '[if]'
                });

                var ifDecorator = new If({
                    expression: GetConditionExpression(node)
                });
                ifDecorator.addChild(CreateTaskSequence(node.children, config));
                selector.addChild(ifDecorator)

                var succeeder = new Succeeder();
                selector.addChild(succeeder);

                return selector;

            case 'else':
                var ifDecorator = new If({
                    title: '[else]',
                    expression: GetConditionExpression(node)
                });
                ifDecorator.addChild(CreateTaskSequence(node.children, config));

                return ifDecorator;

            case 'while':
                var whileDecorator = new RepeatUntilFailure({
                    title: '[while]',
                    returnSuccess: true,
                })
                var ifDecorator = new If({
                    title: '[while]',
                    expression: GetConditionExpression(node)
                });
                ifDecorator.addChild(CreateTaskSequence(node.children, config));
                whileDecorator.addChild(ifDecorator);
                return whileDecorator;

            default:
                var sequence = new TaskSequence({ title: node.title });
                var paragraphs = node.paragraphs;  // paragraphs -> TaskAction[]
                for (var i = 0, cnt = paragraphs.length; i < cnt; i++) {
                    var commandData = GetCommandData(paragraphs[i], config);
                    if (!commandData) {
                        continue;
                    }

                    var commandType = commandData.type;
                    delete commandData.type;

                    var actionNode;
                    switch (commandType) {
                        case 'exit':
                            actionNode = new Abort({ title: '[exit]' });
                            break;

                        case 'break':
                            actionNode = new Failer({ title: '[break]' });
                            break;

                        default:
                            actionNode = new TaskAction(commandData);
                            break;
                    }

                    sequence.addChild(actionNode);

                }
                return sequence;
        }
    }
}

var GetCommandData = function (paragraph, config) {
    var commandData;
    if (paragraph.hasOwnProperty('block')) {
        commandData = ParseCommandString(paragraph.block, ',', config);
        commandData.parameters.text = paragraph.text;
    } else {
        commandData = ParseCommandString(paragraph.text, '\n', config);
    }

    return commandData;
}

var ParseCommandString = function (commandString, delimiter, {
    lineReturn = '\\',
    commentLineStart = '\/\/',
} = {}) {
    var lines = commandString.split(delimiter);

    if (delimiter === '\n') {
        // Discard comment lines
        lines = lines.filter(function (line) {
            return !line.trimLeft().startsWith(commentLineStart);
        })

        if (lines.length === 0) {
            return null;
        } else if (lines.length === 1) {
            var line = lines[0];
            if (IsExitCommand(line)) {
                return { type: 'exit' };
            } else if (IsBreakLabelCommand(line)) {
                return { type: 'break' };
            } else if (line.indexOf(',') !== -1) {
                lines = commandString.split(',');
            }
        }
    }

    var commandData = {
        type: 'task',
        name: TrimString(lines[0], lineReturn),
        parameters: {}
    };

    var parameters = commandData.parameters;
    for (var i = 1, cnt = lines.length; i < cnt; i++) {
        ParseProperty(TrimString(lines[i], lineReturn), parameters);
    }
    return commandData;
}

var TrimString = function (s, lineReturn) {
    if (lineReturn && (s.at(-1) === lineReturn)) {
        s = s.substring(0, s.length - 1);
    }
    return s.trimLeft();
}

var IsExitCommand = function (s) {
    return s.trim().toLowerCase() === '[exit]';
}

var IsBreakLabelCommand = function (s) {
    return s.trim().toLowerCase() === '[break]';
}


export default CreateTaskSequence;