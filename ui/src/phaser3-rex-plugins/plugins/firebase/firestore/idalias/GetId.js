var GetId = function (alias) {
    return this.getAliasRef(alias).get()
        .then(function (doc) {
            var id;
            if (doc.exists) {
                id = doc.data().id;
            }
            return Promise.resolve({
                id: id,
                alias: alias
            });
        });
}

export default GetId;