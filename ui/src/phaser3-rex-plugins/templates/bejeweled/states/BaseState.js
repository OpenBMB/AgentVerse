import FSM from '../../../plugins/fsm.js';

class BaseState extends FSM {
    constructor(bejeweled, config) {
        super(config);

        this.bejeweled = bejeweled;                 // Bejeweled
        this.board = bejeweled.board;            // Bejeweled.board
        this.waitEvents = bejeweled.waitEvents;  // Bejeweled.waitEvents
    }

    shutdown() {
        super.shutdown();
        this.bejeweled = undefined;
        this.board = undefined;
        this.waitEvents = undefined;
    }

    destroy() {
        this.shutdown();
        return this;
    }

    next() {
        // Wait until all events are completed
        if (this.waitEvents.noWaitEvent) {
            // Go to next state
            super.next();  
        } else {
            // Try again later
            this.waitEvents.setCompleteCallback(this.next, this);
        }
    }
}

export default BaseState