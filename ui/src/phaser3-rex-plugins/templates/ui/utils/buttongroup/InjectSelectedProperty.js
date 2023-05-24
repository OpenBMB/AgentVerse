import OnButtonStateChange from './OnButtonStateChange.js';

var InjectSelectedProperty = function (gameObject) {
    var self = this;

    gameObject._selected = undefined;
    Object.defineProperty(gameObject, 'selected', {
        get: function () {
            return gameObject._selected;
        },
        set: function (newValue) {
            if (gameObject._selected === newValue) {
                return;
            }
            var previousValue = gameObject._selected;
            gameObject._selected = newValue;

            OnButtonStateChange.call(self, gameObject, newValue, previousValue);
        },
        enumerable: true,
        configurable: true
    });

    gameObject.selected = false;
}

export default InjectSelectedProperty;