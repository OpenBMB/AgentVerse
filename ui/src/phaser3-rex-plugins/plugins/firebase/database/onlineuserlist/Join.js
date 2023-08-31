import Delay from '../../../utils/promise/Delay.js';

var Join = function (userID, userName) {
    if (userID === undefined) {
        userID = this.userID;
        userName = this.userName;
    }

    if (this.contains(userID)) {
        return Promise.resolve();  // Promise
    }

    // Prepare data
    var d = {
        userID: userID,
        userName: userName
    };
    var maxUsers = this.maxUsers;
    var rootRef = this.database.ref(this.rootPath);
    var userRef = rootRef.push();

    return userRef.onDisconnect().remove()
        .then(function () {
            return userRef.set(d)
        })
        .then(function () {
            return Delay(0);
        })
        .then(function () {
            // No user count limitation
            if (maxUsers === 0) {
                self.isInList = true;
                return Promise.resolve();
            }

            // Has user count limitation
            return rootRef.limitToFirst(maxUsers).once('value')
                .then(function (snapshot) {
                    if (Contains(snapshot, userID)) {
                        self.isInList = true;
                        return Promise.resolve();
                    }

                    self.isInList = false;
                    // UserID is not in firstN list
                    return userRef.remove()
                        .then(function () {
                            return userRef.onDisconnect().cancel()
                        })
                        .then(function () {
                            return Promise.reject()
                        })
                });
        })
};

var Contains = function (snapshot, userID) {
    var result = false;
    snapshot.forEach(function (childSnapshot) {
        var user = childSnapshot.val();
        if (user.userID === userID) {
            result = true;
            return true;
        }
    });
    return result;
}

export default Join;