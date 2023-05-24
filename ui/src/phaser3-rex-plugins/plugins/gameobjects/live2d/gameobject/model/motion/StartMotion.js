import * as Const from '../Const.js';
import OnMotionStart from '../../events/OnMotionStart.js';
import OnMotionComplete from '../../events/OnMotionComplete.js';

var StartMotion = function (group, no, priority) {
    if (priority === undefined) {
        priority = Const.PriorityNormal;
    }

    if (priority === Const.PriorityForce) {
        this._motionManager.setReservePriority(priority);
    } else if (!this._motionManager.reserveMotion(priority)) {
        // Error
        return this;
    }

    if (no === undefined) {
        no = Math.floor(Math.random() * this._modelSetting.getMotionCount(group));
    }

    var name = `${group}_${no}`;
    var motion = this._motions.getValue(name);
    if (!motion) {
        // Error
        return this;
    }

    motion._name = name;

    var gameObject = this.parent;
    motion.setFinishedMotionHandler(function () {
        OnMotionComplete(gameObject, group, no)
    });

    this._motionManager.startMotionPriority(
        motion,
        false,
        priority
    );

    OnMotionStart(gameObject, group, no);

    return this;
}

export default StartMotion;