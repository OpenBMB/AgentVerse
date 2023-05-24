var ChangeUserName = function (userName) {
    var self = this;
    return new Promise(function (resolve, reject) {
        var userRef = self.getUserRef();
        if (userRef) { // Find userRef
            resolve(userRef)
        } else { // Query userRef
            var query = self.rootRef.orderByChild('userID').equalTo(self.userID);
            query.once('child_added')
                .then(function (snapshot) {
                    resolve(snapshot.ref)
                })
        }
    })
        .then(function (userRef) { // Set userName
            return userRef.child('userName').set(userName)
        })
        .then(function () {
            self.userName = userName;
            return Promise.resolve();
        })
}

export default ChangeUserName;