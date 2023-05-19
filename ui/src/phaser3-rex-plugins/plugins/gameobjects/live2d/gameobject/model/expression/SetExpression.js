import * as Const from '../Const.js';
import OnExpressionStart from '../../events/OnExpressionStart.js';

var SetExpression = function (name) {
    if (name === undefined) {
        name = 0;
    }

    var motion;
    var nameType = typeof (name);
    if (nameType === 'string') {
        motion = this._expressions.getValue(name);
    } else if (nameType === 'number') {
        var keyValue = this._expressions._keyValues[name];
        motion = (keyValue) ? keyValue.second : null;
        name = (keyValue) ? keyValue.first : undefined;
    }

    if (!motion) {
        // Error
        return this;
    }

    motion._name = name;

    this._expressionManager.startMotionPriority(
        motion,
        false,
        Const.PriorityForce
    );
    this._currentExpressionName = name;

    OnExpressionStart(this.parent, name);

    return this;
}

export default SetExpression;