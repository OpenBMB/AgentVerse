import SetNoWrapText from '../../../utils/text/SetNoWrapText.js';

export default {
    showPage(idx) {
        this.displayText(
            this.getPage(idx)
        );
        return this;
    },

    showNextPage() {
        this.displayText(
            this.getNextPage()
        );
        return this;
    },

    showPreviousPage() {
        this.displayText(
            this.getPreviousPage()
        );
        return this;
    },

    show() {
        this.displayText(
            this.getLines()
        );
        return this;
    },

    showNextLine() {
        this.displayText(
            this.setStartLineIndex(this.startLineIndex + 1).getLines()
        );
        return this;
    },

    showPreviousLine() {
        this.displayText(
            this.setStartLineIndex(this.startLineIndex - 1).getLines()
        );
        return this;
    },

    displayText(text) {
        SetNoWrapText(this.parent, text);
    }
}