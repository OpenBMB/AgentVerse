import LoadYaml from './LoadYaml.js';

import ObjectFactory from '../../ObjectFactory.js';
import SetValue from '../../../../utils/object/SetValue.js';

ObjectFactory.register('yaml', function (yamlString, customNodeHandlers) {
    return LoadYaml(yamlString, customNodeHandlers);
});

SetValue(window, 'RexPlugins.BehaviorTree.LoadYaml', LoadYaml);

export {
    LoadYaml,
};