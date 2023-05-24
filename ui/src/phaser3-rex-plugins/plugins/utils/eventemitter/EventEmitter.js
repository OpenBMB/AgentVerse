import EE from 'eventemitter3';

class EventEmitter extends EE {
    shutdown() {
        this.removeAllListeners();
    }
    destroy() {
        this.removeAllListeners();
    }
}
export default EventEmitter;