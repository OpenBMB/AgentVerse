var Remove = function (id) {
    var self = this;
    return this.getAlias(id)
        .then(function (alias) {
            return self.getAliasRef(alias).delete();
        })
}

export default Remove;