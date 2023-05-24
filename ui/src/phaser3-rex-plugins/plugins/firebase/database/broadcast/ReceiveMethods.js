var methods = {
    startReceiving() {
        if (this.isReceiving && (this.receiverRef.key === this.receiverID)) {
            return this;
        }

        this.stopReceiving();

        this.isReceiving = true;
        this.skipFirst = true;  // Skip previous message
        this.receiverRef = this.database.ref(this.rootPath).child(this.receiverID);
        this.receiverRef.on('value', OnReceive, this);
        this.receiverRef.onDisconnect().remove();
        return this;
    },

    stopReceiving() {
        if (!this.isReceiving) {
            return this;
        }

        this.isReceiving = false;
        this.receiverRef.off('value', OnReceive, this);
        this.receiverRef.remove();
        this.receiverRef.onDisconnect().cancel();
        return this;
    }
}

var OnReceive = function (snapshot) {
    if (this.skipFirst) {
        this.skipFirst = false;
        return;
    }
    var d = snapshot.val();
    if (d == null) {
        return;
    }

    delete d.stamp;
    this.history.add(d);
    this.emit(this.eventNameMap.receive, d);
}

export default methods;