import BaseState from './BaseState.js';
import MatchState from './MatchState.js';
// Actions
import SelectChess from '../actions/SelectChess.js';
import SwapChess from '../actions/SwapChess.js'

const GetValue = Phaser.Utils.Objects.GetValue;

class State extends BaseState {
    constructor(bejeweled, config) {
        super(bejeweled, config);
        // this.bejeweled = bejeweled;      // Bejeweled
        // this.board = bejeweled.board; // Bejeweled.board

        this.selectedChess1;
        this.selectedChess2;
        this.matchState = new MatchState(bejeweled, config); // sub-state

        // Actions
        // select1 action
        this.select1Action = GetValue(config, 'select1Action', SelectChess);
        // select2 action
        this.select2Action = GetValue(config, 'select2Action', this.select1Action);
        // Swap action
        this.swapAction = GetValue(config, 'swapAction', SwapChess);
        // UndoSwap action
        this.undoSwapAction = GetValue(config, 'undoSwapAction', this.swapAction);

        var debug = GetValue(config, 'debug', false);
        if (debug) {
            this.on('statechange', this.printState, this);
        }
    }

    shutdown() {
        super.shutdown();

        this.matchState.shutdown();

        this.matchState = undefined;
        this.selectedChess1 = undefined;
        this.selectedChess2 = undefined;
        return this;
    }

    // START
    enter_START() {
        this.board.init(); // Fill background tiles
        this.next();
    }
    next_START() {
        return 'RESET';
    }
    // START

    // RESET
    enter_RESET() {
        this.board.reset(); // Refill chess
        this.next();
    }
    next_RESET() {
        return 'PRETEST';
    }
    // RESET


    // PRETEST
    enter_PRETEST() {
        this.next();
    }
    next_PRETEST() {
        var nextState;
        if (this.board.preTest()) {
            nextState = 'SELECT1START';
        } else {
            nextState = 'RESET';
        }
        return nextState;
    }
    // PRETEST

    // SELECT1START
    enter_SELECT1() {
        this.selectedChess1 = undefined;
        this.selectedChess2 = undefined;

        this.bejeweled.emit('select1-start', this.board.board, this.bejeweled);
    }
    selectChess1(chess) {
        if (this.state === 'SELECT1START') {
            this.selectedChess1 = chess;
            this.next();
        }
        return this;
    }
    next_SELECT1START() {
        var nextState;
        if (this.selectedChess1) {
            nextState = 'SELECT1';
        }
        return nextState;
    }
    // SELECT1START

    // SELECT1
    enter_SELECT1() {
        var board = this.board.board,
            chess = this.selectedChess1;

        this.bejeweled.emit('select1', chess, board, this.bejeweled);

        this.select1Action(chess, board, this.bejeweled);

        // To next state when all completed
        this.next();
    }
    next_SELECT1() {
        return 'SELECT2START';
    }
    // SELECT1

    // SELECT2START
    enter_SELECT2START() {
        this.bejeweled.emit('select2-start', this.board.board, this.bejeweled);
    }
    selectChess2(chess) {
        if (this.state === 'SELECT2START') {
            this.selectedChess2 = chess;
            this.next();
        }
        return this;
    }
    next_SELECT2START() {
        var nextState;
        if (this.selectedChess2 &&
            this.board.board.areNeighbors(this.selectedChess1, this.selectedChess2)) {
            nextState = 'SELECT2';
        } else {
            nextState = 'SELECT1START';
        }
        return nextState;
    }
    // SELECT2START

    // SELECT2
    enter_SELECT2() {
        var board = this.board.board,
            chess = this.selectedChess2;

        this.bejeweled.emit('select2', chess, board, this.bejeweled);

        this.select2Action(chess, board, this.bejeweled);

        // To next state when all completed
        this.next();
    }
    next_SELECT2() {
        return 'SWAP';
    }
    // SELECT2

    // SWAP
    enter_SWAP() {
        var board = this.board.board,
            chess1 = this.selectedChess1,
            chess2 = this.selectedChess2;

        this.bejeweled.emit('swap', chess1, chess2, board, this.bejeweled);

        this.swapAction(chess1, chess2, board, this.bejeweled);

        // To next state when all completed
        this.next();
    }
    next_SWAP() {
        return 'MATCH3';
    }
    // SWAP

    // MATCH3
    enter_MATCH3() {
        this.matchState
            .once('complete', this.next, this)
            .goto('START');
    }
    next_MATCH3() {
        var nextState;
        if (this.matchState.totalMatchedLinesCount === 0) {
            nextState = 'UNDOSWAP';
        } else {
            nextState = 'PRETEST';
        }
        return nextState;
    }
    // MATCH3

    // UNDO_SWAP
    enter_UNDOSWAP() {
        var board = this.board.board,
            chess1 = this.selectedChess1,
            chess2 = this.selectedChess2;

        this.bejeweled.emit('undo-swap', chess1, chess2, board, this.bejeweled);

        this.undoSwapAction(chess1, chess2, board, this.bejeweled);

        // To next state when all completed
        this.next();
    }
    next_UNDOSWAP() {
        return 'SELECT1START';
    }
    // UNDO_SWAP

    // debug
    printState() {
        console.log('Main state: ' + this.prevState + ' -> ' + this.state);
    }

}

export default State;