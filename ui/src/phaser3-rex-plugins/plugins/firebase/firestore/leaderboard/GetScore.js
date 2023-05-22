var GetScore = function (userID) {
    return this.getMyRecordQuery(userID).get()
        .then(function (querySnapshot) {
            var item;
            if (querySnapshot.size > 0) {
                var doc = querySnapshot.docs[0];
                item = doc.data();
            }
            return Promise.resolve(item);
        });
}

export default GetScore;