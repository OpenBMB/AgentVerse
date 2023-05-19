var MenuSetInteractive = function (menu) {
    menu
        // Expand sub event
        .on(menu.root.expandEventName, function (button, index) {
            if (this._isPassedEvent) {
                return;
            }
            var childrenKey =  this.root.childrenKey;
            var subItems = this.items[index][childrenKey];
            if (subItems) {
                this.expandSubMenu(button, subItems);
            } else {
                // this.root.on('button.click', button); // TODO
            }
        }, menu)
        // Click any button
        .on('button.click', function (button, index, pointer, event) {
            // Pass event to root menu object
            if (this !== this.root) {
                this.root._isPassedEvent = true;
                this.root.emit('button.click', button, index, pointer, event);
                this.root._isPassedEvent = false;
            }
        }, menu)
        //Pointer over any button
        .on('button.over', function (button, index, pointer, event) {
            // Pass event to root menu object
            if (this !== this.root) {
                this.root._isPassedEvent = true;
                this.root.emit('button.over', button, index, pointer, event);
                this.root._isPassedEvent = false;
            }
        }, menu)
        //Pointer out any button
        .on('button.out', function (button, index, pointer, event) {
            // Pass event to root menu object
            if (this !== this.root) {
                this.root._isPassedEvent = true;
                this.root.emit('button.out', button, index, pointer, event);
                this.root._isPassedEvent = false;
            }
        }, menu);
};

export default MenuSetInteractive;