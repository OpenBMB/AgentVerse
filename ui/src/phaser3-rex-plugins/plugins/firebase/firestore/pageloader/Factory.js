import PageLoader from './PageLoader.js';
import ObjectFactory from '../../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';

ObjectFactory.register('pageLoader', function (config) {
    return new PageLoader(config);
});

SetValue(window, 'RexPlugins.Fire.PageLoader', PageLoader);

export default PageLoader;