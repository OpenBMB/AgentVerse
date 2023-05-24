export default {
    startMonitorTarget() {
        if (this.isMonitoring) {
            return this;
        }

        this.isMonitoring = true;
        this.scene.events.on('postupdate', this.onMonitorTarget, this);
        return this;
    },

    stopMonitorTarget() {
        if (!this.isMonitoring) {
            return this;
        }

        this.isMonitoring = false;
        this.scene.events.off('postupdate', this.onMonitorTarget, this);
        return this;
    },

    onMonitorTarget() {
        if (!this.bindingTarget) {
            return;
        }

        var newValue = this.bindingTarget[this.bindTargetKey];
        var inputField = this.childrenMap.inputField;
        if (inputField.value === newValue) {
            return;
        }
        // Sync new value
        inputField.syncValue(newValue);

    },
}