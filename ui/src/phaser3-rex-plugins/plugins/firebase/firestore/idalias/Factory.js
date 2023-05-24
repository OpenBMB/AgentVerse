import IdAlias from './IdAlias.js';
import ObjectFactory from '../../ObjectFactory.js';
import SetValue from '../../../utils//object/SetValue.js';

ObjectFactory.register('idAlias', function (config) {
    return new IdAlias(config);
});

SetValue(window, 'RexPlugins.Fire.IdAlias', IdAlias);

export default IdAlias;