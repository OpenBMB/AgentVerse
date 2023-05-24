const Clamp = Phaser.Math.Clamp;

export default {
    scrollToLine(lineIndex) {
        this.setChildOY(-this.lineHeight * lineIndex);
        return this;
    },

    scrollToNextLine(lineCount) {
        if (lineCount === undefined) {
            lineCount = 1;
        }

        var lineIndex = this.lineIndex + lineCount;
        this.scrollToLine(lineIndex);
        return this;
    }
}