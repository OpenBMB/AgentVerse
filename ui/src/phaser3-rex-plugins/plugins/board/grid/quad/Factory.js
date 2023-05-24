import Quad from './Quad.js';
import ObjectFactory from '../../ObjectFactory.js';

ObjectFactory.register('quadGrid', function (config) {
    return new Quad(config);
});

export default Quad;