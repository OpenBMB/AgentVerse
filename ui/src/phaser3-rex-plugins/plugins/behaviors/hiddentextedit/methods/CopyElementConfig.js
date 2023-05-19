import {
    ElementProperties,
    StyleProperties,
} from './InputTextProperties.js';
import CopyProperty from '../../../utils/object/CopyProperty.js';

var CopyElementConfig = function (from) {
    if (from === undefined) {
        from = {};
    }
    var to = {};

    CopyProperty(from, to, 'inputType');
    CopyProperty(from, to, 'type');
    CopyProperty(from, to, 'style');
    CopyProperty(from, to, StyleProperties);
    CopyProperty(from, to, ElementProperties);

    return to;
}

export default CopyElementConfig;