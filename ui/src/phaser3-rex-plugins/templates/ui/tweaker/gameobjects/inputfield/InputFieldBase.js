import Sizer from '../../../sizer/Sizer.js';

class InputFiledBase extends Sizer {
    get bindingTarget() {
        return this.getParentSizer().bindingTarget;
    }

    get bindingKey() {
        return this.getParentSizer().bindTargetKey;
    }

    get value() {
        return this._value;
    }

    validate(newValue) {
        if (this.syncValueFlag || !this.validateCallback) {
            return true;
        }
        return this.validateCallback(newValue, this._value, this.bindingTarget, this.bindingKey);
    }

    // Override
    set value(value) {
        if (this._value === value) {
            return;
        }

        var oldValue = this._value;
        this._value = value;

        if (!this.syncValueFlag) {
            this.emit('valuechange', value, oldValue, this.bindingTarget, this.bindingKey);
        }
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    /* 
    Internal method invoked when 
    - inputRow.setBindingTarget(target), or 
    - inputRow.syncTargetValue()
    */
    syncValue(value) {
        this.syncValueFlag = true;
        this.value = value;
        this.syncValueFlag = false;

        return this;
    }

    // Override
    get readOnly() {
        return this._readOnly;
    }

    // Override
    set readOnly(value) {
        this._readOnly = value;
    }

    setReadOnly(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.readOnly = enable;
        return true;
    }

    setTextFormatCallback(callback) {
        this.textFormatCallback = callback;
        return this;
    }

    setValidateCallback(callback) {
        this.validateCallback = callback;
        return this;
    }

}

export default InputFiledBase;