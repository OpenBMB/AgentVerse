import Hexagon from './Hexagon.js';
import ObjectFactory from '../../ObjectFactory.js';

ObjectFactory.register('hexagonGrid', function (config) {
    return new Hexagon(config);
});

export default Hexagon;