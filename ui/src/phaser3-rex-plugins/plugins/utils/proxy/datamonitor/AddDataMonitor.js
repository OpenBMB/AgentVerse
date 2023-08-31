import AddMonitor from './AddMonitor.js';

var AddDataMonitor = function (eventEmitter, data) {
    if (data === undefined) {
        data = {};
    }
    return AddMonitor(eventEmitter, data, '');
}

export default AddDataMonitor;