var Init = function () {
    var self = this;
    this.initialFlag = false;
    return this.updater
        .clear()
        .load()
        .then(function (value) {
            self.initialFlag = true;
            self.emit(self.eventNames.init, value);
            return Promise.resolve(value);
        })
}

export default Init;