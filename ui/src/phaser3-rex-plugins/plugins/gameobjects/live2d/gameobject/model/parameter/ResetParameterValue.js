const Capitalize = Phaser.Utils.String.UppercaseFirst;

var ResetParameterValue = function (name) {
    var propertyName = `_idParam${Capitalize(name)}`;
    if (!this.hasOwnProperty(propertyName)) {
        this.registerParameter(name);

        // Can't register this parameter
        if (!this.hasOwnProperty(propertyName)) {
            return this;
        }
    }

    this._addParamValues[name] = 0;

    return this;
}

export default ResetParameterValue;