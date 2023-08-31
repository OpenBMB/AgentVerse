export default {
    getSelectedChess1() {
        return this.mainState.selectedChess1;
    },

    getSelectedChess2() {
        return this.mainState.selectedChess2;
    },

    selectChess1(chess) {
        this.mainState.selectChess1(chess);
        return this;
    },

    selectChess2(chess) {
        this.mainState.selectChess2(chess);
        return this;
    },

    setInputEnable(enable) {
        if (this.input) {
            this.input.setEnable(enable);
        }
        return this;
    },
}