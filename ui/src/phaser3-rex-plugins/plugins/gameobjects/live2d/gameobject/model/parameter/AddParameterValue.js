const Capitalize = Phaser.Utils.String.UppercaseFirst;

var AddParameterValue = function (name, value) {
    var propertyName = `_idParam${Capitalize(name)}`;
    if (!this.hasOwnProperty(propertyName)) {
        this.registerParameter(name);

        // Can't register this parameter
        if (!this.hasOwnProperty(propertyName)) {
            // Error
            return this;
        }
    }

    this._addParamValues[name] += value;

    return this;
}

export default AddParameterValue;