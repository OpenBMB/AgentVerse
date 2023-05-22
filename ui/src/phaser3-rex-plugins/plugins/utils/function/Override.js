var Override = function (newCallback, newScope, oldCallback, oldScope, insertBefore) {
    if (insertBefore === undefined) {
        insertBefore = false;
    }
    if (oldCallback) {
        if (insertBefore) {
            return function() {
                newCallback.apply(newScope, arguments);
                oldCallback.apply(oldScope, arguments);                
            }
        } else {
            return function () {
                oldCallback.apply(oldScope, arguments);
                newCallback.apply(newScope, arguments);
            }
        }
    } else {
        return newCallback.bind(newScope)
    }
}

export default Override;