import Delay from '../../utils/promise/Delay.js';

var AvailableTestPromise = function (config) {
    if (AvailableTest(config)) {
        return Promise.resolve();
    }
    
    // console.log('test again')
    return Delay(10)
        .then(function () {
            return AvailableTestPromise(config);
        });
}

var AvailableTest = function (config) {
    var testCallback;
    for (var k in config) {
        if (!config[k]) {
            continue;
        }
        testCallback = TestCallbacks[k];
        if (testCallback && !testCallback()) {
            return false;
        }
    }
    return true;
}

var TestCallbacks = {
    database: function () {
        return (firebase.database !== undefined);
    },

    firestore: function () {
        return (firebase.firestore !== undefined);
    }
}

export default AvailableTestPromise;