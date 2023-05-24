var ToggleListPanel = function () {
    if (!this.listPanel) {
        this.openListPanel();
    } else {
        this.closeListPanel();
    }
    return this;
}

export default ToggleListPanel;