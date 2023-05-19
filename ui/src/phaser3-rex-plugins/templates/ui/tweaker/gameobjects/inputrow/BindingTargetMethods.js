export default {
    setupBinding() {
        var inputField = this.childrenMap.inputField;
        inputField
            // Set text value to object when closing editor
            .on('valuechange', function (value) {
                if (!this.bindingTarget || !this.autoUpdateEnable) {
                    return;
                }

                this.bindingTarget[this.bindTargetKey] = value;
            }, this);

        return this;
    },

    setAutoUpdateEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.autoUpdateEnable = enable;
        return this;
    },

    setBindingTarget(target, key) {
        this.bindingTarget = target;

        if (key !== undefined) {
            this.setBindingTargetKey(key);
        }

        this.syncTargetValue();
        return this;
    },

    setBindingTargetKey(key) {
        this.bindTargetKey = key;
        return this;
    },

    syncTargetValue() {
        if (!this.bindingTarget || !this.bindTargetKey) {
            return this;
        }

        var inputField = this.childrenMap.inputField;
        inputField.syncValue(this.bindingTarget[this.bindTargetKey]);

        return this;
    },


}