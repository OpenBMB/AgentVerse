import SpliceOne from '../../../../../utils/array/SpliceOne.js';

var AddChildCallback = function (snapshot, prevName) {
    var item = AddItem.call(this, snapshot, prevName);
    this.updateItemID2Index();

    this.emit(this.eventNameMap.add, item);
    this.emit(this.eventNameMap.update, this.items);
}

var ChangeChildCallback = function (snapshot, prevName) {
    var prevItem = RemoveItem.call(this, snapshot);
    this.updateItemID2Index();
    var newItem = AddItem.call(this, snapshot, prevName);
    this.updateItemID2Index();

    this.emit(this.eventNameMap.change, newItem, prevItem);
    this.emit(this.eventNameMap.update, this.items);
}

var RemoveChildCallback = function (snapshot) {
    var item = RemoveItem.call(this, snapshot);
    this.updateItemID2Index();

    this.emit(this.eventNameMap.remove, item);
    this.emit(this.eventNameMap.update, this.items);
}

var GetAllChildrenCallback = function (snapshot) {
    this.clear();
    snapshot.forEach((function (childSnapshot) {
        AddItem.call(this, childSnapshot, null, true);
    }).bind(this));
    this.updateItemID2Index();

    this.emit(this.eventNameMap.update, this.items);
}

var AddItem = function(snapshot, prevName, pushMode) {
    var item;
    var callback = this.getItemCallback;
    var scope = this.getItemCallbackScope;
    if (scope) {
        item = callback.call(scope, snapshot);
    } else {
        item = callback(snapshot);
    }

    if (pushMode) {
        this.items.push(item);
        return item;
    }

    if (prevName == null) {
        this.items.unshift(item);
    } else {
        var i = this.itemID2Index[prevName];
        if (i === this.items.length - 1) {
            this.items.push(item);
        } else {
            this.items.splice(i + 1, 0, item);
        }
    }
    return item;
}

var RemoveItem = function (snapshot) {
    var index = this.itemID2Index[snapshot.key];
    var item = SpliceOne(this.items, index);
    return item
}

export {
    AddChildCallback,
    ChangeChildCallback,
    RemoveChildCallback,
    GetAllChildrenCallback
}