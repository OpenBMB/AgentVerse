import FSM from '../../fsm.js';

/*
graph TD

IDLE --> |"requestOpen()"| TRANS_OPNE["TRAN_OPEN<br>runTransitionInCallback()"]
TRANS_OPNE --> |transitInTime| OPEN
OPEN --> |"requestClose()"| TRANS_CLOSE["TRANS_CLOSE<br>runTransitionOutCallback()"]
TRANS_CLOSE --> |transitOutTime| CLOSE
CLOSE --> |"requestOpen()"| TRANS_OPNE
*/

class State extends FSM {
    constructor(parent, config) {
        super(config);
        this.parent = parent;

        var initState = config.initState || 'IDLE';
        this.start(initState);
    }

    init() {
        this.start('IDLE');
    }

    // IDLE -> TRANS_OPNE
    next_IDLE() {
        return 'TRANS_OPNE';
    }
    // IDLE

    // TRANS_OPNE -> OPEN
    next_TRANS_OPNE() {
        return 'OPEN';
    }
    enter_TRANS_OPNE() {
        var transitionBehavior = this.parent;
        if (transitionBehavior.transitInTime > 0) {
            var delay = transitionBehavior.runTransitionInCallback();
            transitionBehavior.delayCall(delay, this.next, this);
        } else {
            this.next();
        }
    }
    exit_TRANS_OPNE() {
        var transitionBehavior = this.parent;
        transitionBehavior.removeDelayCall();
    }
    // TRANS_OPNE

    // OPEN -> TRANS_CLOSE
    next_OPEN() {
        return 'TRANS_CLOSE';
    }
    enter_OPEN() {
        var transitionBehavior = this.parent;
        transitionBehavior.onOpen();
    }
    exit_OPEN() {
        var transitionBehavior = this.parent;
        transitionBehavior.removeDelayCall();
    }
    // OPEN

    // TRANS_CLOSE -> CLOSE
    next_TRANS_CLOSE() {
        return 'CLOSE';
    }
    enter_TRANS_CLOSE() {
        var transitionBehavior = this.parent;
        if (transitionBehavior.transitOutTime > 0) {
            var delay = transitionBehavior.runTransitionOutCallback();
            transitionBehavior.delayCall(delay, this.next, this);
        } else {
            this.next();
        }
    }
    exit_TRANS_CLOSE() {
        var transitionBehavior = this.parent;
        transitionBehavior.removeDelayCall();
    }
    // TRANS_CLOSE

    // CLOSE -> TRANS_OPNE
    next_CLOSE() {
        return 'TRANS_OPNE';
    }
    enter_CLOSE() {
        var transitionBehavior = this.parent;
        transitionBehavior.onClose();
    }
    exit_CLOSE() {
    }
    // CLOSE

    canOpen() {
        return (this.state === 'IDLE') || (this.state === 'CLOSE');
    }

    canClose() {
        return (this.state === 'IDLE') || (this.state === 'OPEN');
    }
}

export default State;