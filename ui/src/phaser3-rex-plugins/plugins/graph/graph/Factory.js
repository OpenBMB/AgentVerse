import Graph from './Graph.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../utils/object/SetValue.js';

ObjectFactory.register('graph', function (config) {
    return new Graph(this.scene, config);
});

SetValue(window, 'RexPlugins.Graph.Graph', Graph);

export default Graph;