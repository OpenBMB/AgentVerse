var Add = function (id, alias) {
    var self = this;
    return this.database.runTransaction(function (transaction) {
        var aliasRef = self.getAliasRef(alias);
        return transaction.get(aliasRef).then(function (doc) {
            if (!doc.exists) {
                transaction.set(aliasRef, { id: id });
                return Promise.resolve({ id: id, alias: alias });
            } else {
                return Promise.reject({ id: id, alias: alias });
            }
        });
    });
}
export default Add;