import OnIdle from '../../events/OnIdle.js';

const Capitalize = Phaser.Utils.String.UppercaseFirst;

var Update = function (time, delta) {
    var deltaTimeSeconds = delta / 1000;

    var motionUpdated = false;
    this._model.loadParameters();
    if (!this._motionManager.isFinished()) {
        motionUpdated = this._motionManager.updateMotion(this._model, deltaTimeSeconds);
    } else {
        OnIdle(this.parent);
    }
    this._model.saveParameters();

    // Add parameter values
    for (var name in this._addParamValues) {
        var addValue = this._addParamValues[name];
        if (addValue === 0) {
            continue;
        }

        var propertyName = `_idParam${Capitalize(name)}`;
        if (!this.hasOwnProperty(propertyName)) {
            this.registerParameter(name);

            // Can't register this parameter
            if (!this.hasOwnProperty(propertyName)) {
                // Error
                return this;
            }
        }

        this._model.addParameterValueById(this[propertyName], addValue);
    }

    if (!motionUpdated && this._eyeBlink) {
        this._eyeBlink.updateParameters(this._model, deltaTimeSeconds);
    }

    if (this._expressionManager) {
        this._expressionManager.updateMotion(this._model, deltaTimeSeconds);
    }

    if (this._breath != null) {
        this._breath.updateParameters(this._model, deltaTimeSeconds);
    }

    if (this._physics != null) {
        this._physics.evaluate(this._model, deltaTimeSeconds);
    }

    if (this._lipsync && (this._lipSyncValue !== 0)) {
        var count = this._lipSyncIds.getSize();
        for (var i = 0; i < count; ++i) {
            this._model.addParameterValueById(this._lipSyncIds.at(i), this._lipSyncValue);
        }
    }

    if (this._pose != null) {
        this._pose.updateParameters(this._model, deltaTimeSeconds);
    }

    this._model.update();

    return this;
}

export default Update;