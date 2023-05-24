var CloseListPanel = function () {
    if (!this.dropDownBehavior) {
        return this;
    }

    this.dropDownBehavior.requestClose();

    return this;
}

export default CloseListPanel;