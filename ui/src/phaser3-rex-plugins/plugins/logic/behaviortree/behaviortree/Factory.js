import BehaviorTree from './BehaviorTree.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';

ObjectFactory.register('behaviorTree', function (config) {
    return new BehaviorTree(config);
});

SetValue(window, 'RexPlugins.BehaviorTree.BehaviorTree', BehaviorTree);

export {
    BehaviorTree,
};