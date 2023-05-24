import AddAliasTransaction from './AddAliasTransaction.js';

var Add = function (id, alias) {
    var self = this;
    return this.getAlias(id)
        .then(function (result) {
            if (result.alias) {
                if (result.alias === alias) {
                    return Promise.resolve({ id: id, alias: alias });
                } else {
                    return Promise.reject({ id: id, alias: alias });
                }
            } else {
                return AddAliasTransaction.call(self, id, alias);
            }
        });
}

export default Add;