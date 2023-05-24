var Send = function (message) {
    if ((!this.sendToRef) || (this.sendToRef.key !== this.receiverID)) {
        this.sendToRef = this.database.ref(this.rootPath).child(this.receiverID);
    }

    // Clear message
    if (message === undefined) {
        return this.sendToRef.remove(); // Promise
    }

    var d = {
        message: message,
        senderID: this.userID,
        stamp: this.stamp,
    };
    if (this.userName !== undefined) {
        d.senderName = this.userName;
    }
    this.skipFirst = false;
    this.stamp = !this.stamp;
    return this.sendToRef.set(d);
}

export default Send;