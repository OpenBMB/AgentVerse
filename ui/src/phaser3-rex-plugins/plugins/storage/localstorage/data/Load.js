var LoadDataKeys = function () {
    this.dataKeys.clear();
    var keys = this.getItem('__keys__');
    if (keys) {
        for (var i = 0, cnt = keys.length; i < cnt; i++) {
            this.dataKeys.set(keys[i]);
        }
    }
    return this;
}

var Load = function (defaultData, reset) {
    if (defaultData === undefined) {
        reset = false;
    }

    LoadDataKeys.call(this);
    this.defaultData = defaultData;

    this._syncEnable = false;
    this.reset();
    if (!reset) {
        // Load data from localstorage according to dataKeys
        this.dataKeys.iterate(function (dataKey, index) {
            this.set(dataKey, this.getItem(dataKey));
        }, this);
    }
    this._syncEnable = true;

    if (defaultData) {  // Load data according to defaultData        
        var value, prevValue;
        for (var dataKey in defaultData) {
            prevValue = (reset) ? undefined : this.getItem(dataKey);
            value = (prevValue === undefined) ? defaultData[dataKey] : prevValue;
            this.set(dataKey, value);
        }

        this.setItem('__keys__', this.dataKeys.entries);
    }

    return this;
}

export default Load;