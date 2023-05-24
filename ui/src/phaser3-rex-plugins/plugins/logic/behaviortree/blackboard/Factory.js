import Blackboard from './Blackboard.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';

ObjectFactory.register('blackboard', function (config) {
    return new Blackboard(config);
});

SetValue(window, 'RexPlugins.BehaviorTree.Blackboard', Blackboard);

export {
    Blackboard,
};