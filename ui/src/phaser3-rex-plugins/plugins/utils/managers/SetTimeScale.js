var SetTimeScale = function (value) {
    this.timeline.timeScale = value;
    for (var name in this.gameObjectManagers) {
        this.gameObjectManagers[name].setTimeScale(value);
    }
    return this;
}

export default SetTimeScale;