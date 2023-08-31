import MoveTo from './MoveTo.js';
import MiniBoardMoveTo from '../miniboard/moveto/MoveTo.js';
import IsMiniBoardObject from '../miniboard/IsMiniBoardObject.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../utils/object/SetValue.js';

ObjectFactory.register('moveTo', function (gameObject, config) {
    var klass = (IsMiniBoardObject(gameObject)) ? MiniBoardMoveTo : MoveTo;
    return new klass(gameObject, config);
});

SetValue(window, 'RexPlugins.Board.MoveTo', MoveTo);
SetValue(window, 'RexPlugins.Board.MiniBoardMoveTo', MiniBoardMoveTo);

export default MoveTo;