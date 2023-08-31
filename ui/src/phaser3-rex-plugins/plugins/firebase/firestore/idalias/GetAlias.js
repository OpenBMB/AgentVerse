var GetAlias = function (id) {
    return this.rootRef.where('id', '==', id).limit(1).get()
        .then(function (querySnapshot) {
            var alias;
            if (querySnapshot.size > 0) {
                var doc = querySnapshot.docs[0];
                alias = doc.id;
            }
            return Promise.resolve({
                id: id,
                alias: alias
            });
        });
}

export default GetAlias;