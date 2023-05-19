import Maker from './Maker.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('maker', function (styles, customBuilders) {
    return new Maker(this.scene, styles, customBuilders);
});

SetValue(window, 'RexPlugins.UI.Maker', Maker);

export default Maker;