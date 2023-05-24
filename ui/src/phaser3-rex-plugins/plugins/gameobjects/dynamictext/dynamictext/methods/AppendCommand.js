var AppendCommand = function (name, callback, param, scope) {
    var child = this.createCommandChild(name, callback, param, scope);
    this.addChild(child);

    return this;
}

export default AppendCommand;